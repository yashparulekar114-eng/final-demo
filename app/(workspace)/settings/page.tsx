import { auth, currentUser } from "@clerk/nextjs/server";
import { getAppRole } from "@/lib/roles";

export default async function SettingsPage() {
  await auth.protect();
  const user = await currentUser();
  const role = getAppRole(user);

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted mt-1">Workspace defaults for this demo.</p>
      </div>
      <div className="card-quiet p-6 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Role</p>
        <p className="text-sm font-medium capitalize">{role}</p>
        <p className="text-sm text-muted">
          Set at sign-up from the landing page (I am a recruiter / I am a candidate)
          and stored in Clerk metadata.
        </p>
      </div>
      <form className="card-quiet p-6 space-y-4">
        <div>
          <label className="label" htmlFor="co">
            Company name
          </label>
          <input id="co" className="field" defaultValue="TalentFlow" />
        </div>
        <div>
          <label className="label" htmlFor="tz">
            Timezone
          </label>
          <select id="tz" className="field" defaultValue="Asia/Kolkata">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>
        </div>
        <button type="button" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
