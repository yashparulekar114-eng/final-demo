import { auth } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  await auth.protect();
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted mt-1">Workspace defaults for this demo.</p>
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
