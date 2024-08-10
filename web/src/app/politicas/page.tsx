import Body from "../../components/Body";
import { getUserData } from "../../lib/getUserData";
import { createClient } from "../../utils/supabase/server";

export default async function PoliciesPage() {
  const supabase = createClient();
  const { user } = await getUserData();
  return (
    <Body user={user}>
      <div>
        <h1>Políticas da Refrigel</h1>
      </div>
    </Body>
  );
}
