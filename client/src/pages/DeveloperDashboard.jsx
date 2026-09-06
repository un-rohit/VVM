import {
  AlertCircle,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  KeyRound,
  LogOut,
  Newspaper,
  Plus,
  Power,
  Settings2,
  Shield,
  Trash2,
  UserCircle,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../data/adminAuth.js";
import {
  createSchool,
  createSchoolAdmin,
  deleteAdmin,
  listAdmins,
  listSchools,
  updateAdmin,
  updateSchool,
} from "../services/developerApi.js";
import {
  FEATURES as PLAN_FEATURES,
  PLANS,
  cleanFeatures,
  featuresForPlan,
} from "../config/schoolPlans.js";

const FEATURE_ICONS = {
  notices: Newspaper,
  news: Newspaper,
  events: CalendarDays,
};
const FEATURES = PLAN_FEATURES.map((feature) => ({
  ...feature,
  icon: FEATURE_ICONS[feature.id] || Newspaper,
}));
const PLAN_COLORS = {
  basic: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  standard: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  premium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  custom: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};
const emptySchool = {
  name: "",
  plan: "basic",
  features: featuresForPlan("basic"),
};
const emptyAdmin = { username: "", password: "" };

function Toast({ toasts, remove }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
            t.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {t.type === "error" ? (
            <XCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {t.text}
          <button
            type="button"
            onClick={() => remove(t.id)}
            className="ml-1 rounded p-0.5 opacity-60 hover:opacity-100"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const toast = (text, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    window.setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000,
    );
  };
  return {
    toasts,
    toast,
    remove: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
  };
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-semibold text-slate-950">Are you sure?</p>
            <p className="mt-1 text-sm text-slate-500">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturePill({ label, icon: Icon, enabled, loading, onToggle }) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onToggle}
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition disabled:opacity-50 ${
        enabled
          ? "border-primary/20 bg-primary/5 text-primary"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full ${enabled ? "bg-primary" : "bg-slate-200"}`}
      >
        <span
          className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-[18px]" : "translate-x-1"}`}
        />
      </span>
    </button>
  );
}

export default function DeveloperDashboard() {
  const navigate = useNavigate();
  const { toasts, toast, remove } = useToast();
  const [schools, setSchools] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featureLoading, setFeatureLoading] = useState({});
  const [adminLoading, setAdminLoading] = useState({});
  const [schoolForm, setSchoolForm] = useState(emptySchool);
  const [adminForm, setAdminForm] = useState(emptyAdmin);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [savingSchool, setSavingSchool] = useState(false);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState("features");

  const school = schools[0] || null;
  const stats = useMemo(
    () => ({
      total: schools.length,
      active: schools.filter((s) => s.isActive).length,
      premium: schools.filter((s) => s.plan === "premium").length,
    }),
    [schools],
  );

  const load = async () => {
    try {
      const list = await listSchools();
      setSchools(list);
      setAdmins(list[0]?._id ? await listAdmins(list[0]._id) : []);
    } catch {
      toast("Could not load control panel.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = async () => {
    await logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const openCreate = () => {
    setSchoolForm(emptySchool);
    setShowSchoolForm(true);
  };

  const editSchoolName = async () => {
    const name = window.prompt("School name", school?.name || "");
    if (name === null) return;
    try {
      const updated = await updateSchool(school._id, { name });
      setSchools([updated]);
      toast("School updated.");
    } catch (err) {
      toast(err.response?.data?.message || "Failed to update school.", "error");
    }
  };

  const saveSchool = async (event) => {
    event.preventDefault();
    setSavingSchool(true);
    try {
      const created = await createSchool(schoolForm);
      setSchools([created]);
      setAdmins([]);
      setShowSchoolForm(false);
      setSchoolForm(emptySchool);
      toast("School created successfully.");
    } catch (err) {
      toast(err.response?.data?.message || "Failed to create school.", "error");
    } finally {
      setSavingSchool(false);
    }
  };

  const changePlan = async (plan) => {
    try {
      const features = featuresForPlan(plan);
      const updated = await updateSchool(school._id, {
        plan,
        ...(features ? { features } : {}),
      });
      setSchools([updated]);
      toast(`Plan updated to ${plan}.`);
    } catch {
      toast("Failed to update plan.", "error");
    }
  };

  const toggleFeature = async (feature, current) => {
    const key = `${school._id}-${feature}`;
    setFeatureLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const updated = await updateSchool(school._id, {
        plan: "custom",
        features: { ...cleanFeatures(school.features), [feature]: !current },
      });
      setSchools([updated]);
      toast(`${feature} ${!current ? "enabled" : "disabled"}.`);
    } catch {
      toast("Failed to update feature.", "error");
    } finally {
      setFeatureLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const toggleActive = () => {
    const next = !school.isActive;
    setConfirm({
      message: next
        ? `Enable ${school.name}?`
        : `Disable ${school.name}? Admins will not be able to log in.`,
      onConfirm: async () => {
        setConfirm(null);
        try {
          const updated = await updateSchool(school._id, { isActive: next });
          setSchools([updated]);
          toast(`School ${next ? "enabled" : "disabled"}.`);
        } catch {
          toast("Failed to update school status.", "error");
        }
      },
    });
  };

  const createAdmin = async (event) => {
    event.preventDefault();
    if (!school) return;
    setSavingAdmin(true);
    try {
      await createSchoolAdmin(school._id, adminForm);
      setAdminForm(emptyAdmin);
      setShowAddAdmin(false);
      setAdmins(await listAdmins(school._id));
      toast("Admin created successfully.");
    } catch (err) {
      toast(err.response?.data?.message || "Failed to create admin.", "error");
    } finally {
      setSavingAdmin(false);
    }
  };

  const toggleAdmin = async (admin) => {
    setAdminLoading((prev) => ({ ...prev, [admin._id]: true }));
    try {
      const updated = await updateAdmin(admin._id, {
        isActive: !admin.isActive,
      });
      setAdmins((prev) =>
        prev.map((item) => (item._id === updated._id ? updated : item)),
      );
      toast(`Admin ${updated.isActive ? "enabled" : "disabled"}.`);
    } catch {
      toast("Failed to update admin.", "error");
    } finally {
      setAdminLoading((prev) => ({ ...prev, [admin._id]: false }));
    }
  };

  const removeAdmin = (admin) => {
    setConfirm({
      message: `Delete admin ${admin.username}? This cannot be undone.`,
      onConfirm: async () => {
        setConfirm(null);
        try {
          await deleteAdmin(admin._id);
          setAdmins((prev) => prev.filter((item) => item._id !== admin._id));
          toast("Admin deleted.");
        } catch {
          toast("Failed to delete admin.", "error");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toast toasts={toasts} remove={remove} />
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#0F4D43] text-white">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0F4D43]">
                Developer
              </p>
              <h1 className="text-base font-bold text-slate-950">
                Control Panel
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-[#0F4D43] px-3 py-2 text-sm font-semibold text-[#0F4D43] hover:bg-[#0F4D43] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
          <Stat label="Schools" value={stats.total} />
          <Stat label="Active" value={stats.active} color="text-emerald-600" />
          <Stat label="Premium" value={stats.premium} color="text-amber-600" />
        </div>

        {loading ? (
          <div className="grid min-h-[300px] place-items-center rounded-lg border border-slate-200 bg-white">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
          </div>
        ) : !school ? (
          <div className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center">
            <div>
              <Building2 className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-4 text-sm text-slate-500">
                No school exists yet.
              </p>
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f4d43]"
              >
                <Plus className="h-4 w-4" />
                Create School
              </button>
            </div>
          </div>
        ) : (
          <>
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">
                      {school.name}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase ${PLAN_COLORS[school.plan] || PLAN_COLORS.custom}`}
                      >
                        {school.plan}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${school.isActive ? "bg-emerald-500/15 text-emerald-600" : "bg-red-50 text-red-700 ring-1 ring-red-200"}`}
                      >
                        {school.isActive ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={editSchoolName}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex"
                  >
                    <Settings2 className="h-4 w-4 shrink-0" />
                    Edit School
                  </button>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:inline-flex"
                  >
                    <Building2 className="h-4 w-4 shrink-0" />
                    Public Site
                  </a>
                  <button
                    type="button"
                    onClick={toggleActive}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${school.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}
                  >
                    <Power className="h-4 w-4 shrink-0" />
                    {school.isActive ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </section>

            <div className="flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
              {[
                { id: "features", label: "Features", icon: Settings2 },
                { id: "admins", label: "Admins", icon: Users },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold ${activeTab === id ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {id === "admins" && admins.length > 0 && (
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {admins.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === "features" && (
              <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Plan and Features
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Preset plans update feature access immediately. Manual
                      changes switch the plan to Custom.
                    </p>
                  </div>
                  <select
                    value={school.plan}
                    onChange={(e) => changePlan(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    {PLANS.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan.charAt(0).toUpperCase() + plan.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PLANS.map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => changePlan(plan)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${school.plan === plan ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                  {FEATURES.map(({ id, label, icon }) => {
                    const enabled = Boolean(school.features?.[id]);
                    const key = `${school._id}-${id}`;
                    return (
                      <FeaturePill
                        key={id}
                        label={label}
                        icon={icon}
                        enabled={enabled}
                        loading={!!featureLoading[key]}
                        onToggle={() => toggleFeature(id, enabled)}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {activeTab === "admins" && (
              <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      School Admin
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Admin accounts belong to the single configured school.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddAdmin(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/15"
                  >
                    <Plus className="h-4 w-4" />
                    Add Admin
                  </button>
                </div>
                {admins.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">
                    No admins yet.
                  </p>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {admins.map((admin) => (
                      <li
                        key={admin._id}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100">
                            <UserCircle className="h-4 w-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-950">
                              {admin.username}
                            </p>
                            <p className="text-xs text-slate-400">
                              role: {admin.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={!!adminLoading[admin._id]}
                            onClick={() => toggleAdmin(admin)}
                            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${admin.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-50 text-red-700"}`}
                          >
                            {admin.isActive ? (
                              <Check className="h-3 w-3 shrink-0" />
                            ) : (
                              <X className="h-3 w-3 shrink-0" />
                            )}
                            {admin.isActive ? "Active" : "Disabled"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAdmin(admin)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </main>

      {showSchoolForm && (
        <SchoolForm
          form={schoolForm}
          saving={savingSchool}
          onSubmit={saveSchool}
          onCancel={() => setShowSchoolForm(false)}
          onChange={setSchoolForm}
        />
      )}
      {showAddAdmin && (
        <AdminForm
          form={adminForm}
          saving={savingAdmin}
          schoolName={school?.name}
          onSubmit={createAdmin}
          onCancel={() => setShowAddAdmin(false)}
          onChange={setAdminForm}
        />
      )}
    </div>
  );
}

function Stat({ label, value, color = "text-slate-950" }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function SchoolForm({ form, saving, onSubmit, onCancel, onChange }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-7 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">Create School</h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="School Name *">
            <input
              required
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              placeholder="e.g. Dev Bhoomi MI School"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </Field>
          <Field label="Plan">
            <select
              value={form.plan}
              onChange={(e) =>
                onChange({
                  ...form,
                  plan: e.target.value,
                  features: featuresForPlan(e.target.value) || form.features,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              {PLANS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-2">
            {FEATURES.map(({ id, label, icon: Icon }) => {
              const on = Boolean(form.features?.[id]);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...form,
                      plan: "custom",
                      features: { ...cleanFeatures(form.features), [id]: !on },
                    })
                  }
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium ${on ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-500"}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {on && <Check className="ml-auto h-4 w-4" />}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-[#0f4d43] disabled:opacity-60"
            >
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Create School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminForm({ form, saving, schoolName, onSubmit, onCancel, onChange }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-7 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Add School Admin
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">{schoolName}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Username *">
            <div className="relative">
              <UserCircle className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                value={form.username}
                onChange={(e) =>
                  onChange({ ...form, username: e.target.value })
                }
                placeholder="schooladmin"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </Field>
          <Field label="Password * (min 8 chars)">
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="password"
                minLength={8}
                value={form.password}
                onChange={(e) =>
                  onChange({ ...form, password: e.target.value })
                }
                placeholder="min 8 characters"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </Field>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-[#0f4d43] disabled:opacity-60"
            >
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
      {label}
      {children}
    </label>
  );
}
