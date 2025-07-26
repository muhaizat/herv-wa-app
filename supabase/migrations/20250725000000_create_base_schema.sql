-- Create users table
CREATE TABLE users (
    id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    phone text UNIQUE,
    first_name text,
    last_name text,
    avatar_url text,
    organization_id uuid,
    role text NOT NULL DEFAULT 'member',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Only allow users to see other users in their organization
CREATE POLICY "Users can see other users in same organization" ON users 
    FOR SELECT 
    USING (organization_id = (auth.jwt() ->> 'organization_id')::uuid);

-- Users can update their own record
CREATE POLICY "Users can update own record" ON users
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Create organizations table
CREATE TABLE organizations (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Add foreign key to users table
ALTER TABLE users ADD CONSTRAINT users_organization_id_fkey 
    FOREIGN KEY (organization_id) REFERENCES organizations(id);

-- Users can see their own organization
CREATE POLICY "Users can see own organization" ON organizations
    FOR SELECT
    USING (id = (
        SELECT organization_id 
        FROM users 
        WHERE id = auth.uid()
    ));

-- Create contacts table
CREATE TABLE contacts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id uuid REFERENCES organizations(id) NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    status text NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (organization_id, phone)
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Users can read contacts in their organization
CREATE POLICY "Users can read contacts in organization" ON contacts
    FOR SELECT
    USING (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

-- Users can insert/update/delete contacts in their organization
CREATE POLICY "Users can insert contacts in organization" ON contacts
    FOR INSERT
    WITH CHECK (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

CREATE POLICY "Users can update contacts in organization" ON contacts
    FOR UPDATE
    USING (organization_id = (
        SELECT organization_id 
        FROM users
        WHERE id = auth.uid()
    ))
    WITH CHECK (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

CREATE POLICY "Users can delete contacts in organization" ON contacts
    FOR DELETE
    USING (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

-- Create campaigns table
CREATE TABLE campaigns (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id uuid REFERENCES organizations(id) NOT NULL,
    name text NOT NULL,
    template text NOT NULL,
    status text NOT NULL DEFAULT 'draft',
    scheduled_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Users can read campaigns in their organization
CREATE POLICY "Users can read campaigns in organization" ON campaigns
    FOR SELECT
    USING (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

-- Users can insert/update/delete campaigns in their organization
CREATE POLICY "Users can insert campaigns in organization" ON campaigns
    FOR INSERT
    WITH CHECK (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

CREATE POLICY "Users can update campaigns in organization" ON campaigns
    FOR UPDATE
    USING (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ))
    WITH CHECK (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

CREATE POLICY "Users can delete campaigns in organization" ON campaigns
    FOR DELETE
    USING (organization_id = (
        SELECT organization_id
        FROM users
        WHERE id = auth.uid()
    ));

-- Create messages table
CREATE TABLE messages (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id uuid REFERENCES campaigns(id) NOT NULL,
    contact_id uuid REFERENCES contacts(id) NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    sent_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can read messages for campaigns in their organization
CREATE POLICY "Users can read messages in organization" ON messages
    FOR SELECT
    USING (campaign_id IN (
        SELECT id
        FROM campaigns
        WHERE organization_id = (
            SELECT organization_id
            FROM users
            WHERE id = auth.uid()
        )
    ));

-- Users can insert/update messages for campaigns in their organization
CREATE POLICY "Users can insert messages in organization" ON messages
    FOR INSERT
    WITH CHECK (campaign_id IN (
        SELECT id
        FROM campaigns
        WHERE organization_id = (
            SELECT organization_id
            FROM users
            WHERE id = auth.uid()
        )
    ));

CREATE POLICY "Users can update messages in organization" ON messages
    FOR UPDATE
    USING (campaign_id IN (
        SELECT id
        FROM campaigns
        WHERE organization_id = (
            SELECT organization_id
            FROM users
            WHERE id = auth.uid()
        )
    ))
    WITH CHECK (campaign_id IN (
        SELECT id
        FROM campaigns
        WHERE organization_id = (
            SELECT organization_id
            FROM users
            WHERE id = auth.uid()
        )
    ));

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Create functions
CREATE OR REPLACE FUNCTION get_organization_id_for_user(user_id uuid)
RETURNS uuid AS $$
BEGIN
    RETURN (
        SELECT organization_id
        FROM users
        WHERE id = user_id
    );
END;
$$ LANGUAGE plpgsql;
