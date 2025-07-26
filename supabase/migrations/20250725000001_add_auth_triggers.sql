-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $function$
declare
  new_org_id uuid;
begin
  -- Create a new organization
  insert into public.organizations (name, slug)
  values (
    new.email, 
    lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9]', '-', 'g'))
  )
  returning id into new_org_id;

  -- Create a new user profile
  insert into public.users (
    id,
    email,
    first_name,
    last_name,
    organization_id,
    role
  )
  values (
    new.id,
    new.email,
    split_part(new.raw_user_meta_data->>'full_name', ' ', 1),
    split_part(new.raw_user_meta_data->>'full_name', ' ', 2),
    new_org_id,
    'admin'
  );

  return new;
end;
$function$;

-- Create trigger on auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_signup();
