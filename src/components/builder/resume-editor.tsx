"use client";

import {
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  ResumeData,
  Experience,
  Education,
  Project,
} from "@/types/resume";

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onContinue: () => void;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function updateField<K extends keyof ResumeData>(
  data: ResumeData,
  key: K,
  value: ResumeData[K]
): ResumeData {
  return { ...data, [key]: value };
}

function updateArrayItem<T>(arr: T[], index: number, item: T): T[] {
  return arr.map((v, i) => (i === index ? item : v));
}

function removeArrayItem<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

// ---------------------------------------------------------------------------
// Section wrapper (collapsible)
// ---------------------------------------------------------------------------

function Section({
  icon: Icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer items-center gap-2 text-lg font-semibold select-none list-none [&::-webkit-details-marker]:hidden">
        <Icon className="h-5 w-5 text-primary" />
        <span>{title}</span>
        <span className="ml-auto text-muted-foreground text-sm transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ResumeEditor({
  data,
  onChange,
  onContinue,
  onBack,
}: ResumeEditorProps) {
  // --- personal info helpers ---
  const setField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange(updateField(data, key, value));

  const setText = (key: keyof ResumeData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setField(key, e.target.value as ResumeData[typeof key]);

  // --- experience helpers ---
  const setExperience = (index: number, exp: Experience) =>
    onChange({ ...data, experience: updateArrayItem(data.experience, index, exp) });

  const addExperience = () =>
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
    });

  const removeExperience = (index: number) =>
    onChange({ ...data, experience: removeArrayItem(data.experience, index) });

  // --- education helpers ---
  const setEducation = (index: number, edu: Education) =>
    onChange({ ...data, education: updateArrayItem(data.education, index, edu) });

  const addEducation = () =>
    onChange({
      ...data,
      education: [
        ...data.education,
        { institution: "", degree: "", field: "", startDate: "", endDate: "" },
      ],
    });

  const removeEducation = (index: number) =>
    onChange({ ...data, education: removeArrayItem(data.education, index) });

  // --- project helpers ---
  const setProject = (index: number, proj: Project) =>
    onChange({ ...data, projects: updateArrayItem(data.projects, index, proj) });

  const addProject = () =>
    onChange({
      ...data,
      projects: [
        ...data.projects,
        { name: "", description: "", url: "", technologies: [] },
      ],
    });

  const removeProject = (index: number) =>
    onChange({ ...data, projects: removeArrayItem(data.projects, index) });

  // ---------------------------------------------------------------------------

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      {/* ---- Personal Info ---- */}
      <Section icon={User} title="Personal Info">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={data.name} onChange={setText("name")} placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" value={data.title} onChange={setText("title")} placeholder="Software Engineer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={data.email} onChange={setText("email")} placeholder="jane@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={data.phone} onChange={setText("phone")} placeholder="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={data.location} onChange={setText("location")} placeholder="San Francisco, CA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={data.website} onChange={setText("website")} placeholder="https://janedoe.dev" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" value={data.linkedin} onChange={setText("linkedin")} placeholder="https://linkedin.com/in/janedoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" value={data.github} onChange={setText("github")} placeholder="https://github.com/janedoe" />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ---- Summary ---- */}
      <Section icon={User} title="Summary">
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            rows={4}
            value={data.summary}
            onChange={setText("summary")}
            placeholder="A brief overview of your professional background and goals..."
          />
        </div>
      </Section>

      <Separator />

      {/* ---- Experience ---- */}
      <Section icon={Briefcase} title="Experience">
        {data.experience.length === 0 && (
          <p className="text-sm text-muted-foreground">No experience entries yet. Add one below.</p>
        )}

        {data.experience.map((exp, i) => (
          <Card key={i}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">
                {exp.role || exp.company ? `${exp.role}${exp.role && exp.company ? " at " : ""}${exp.company}` : `Experience ${i + 1}`}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeExperience(i)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove experience</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role / Title</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => setExperience(i, { ...exp, role: e.target.value })}
                    placeholder="Senior Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => setExperience(i, { ...exp, company: e.target.value })}
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => setExperience(i, { ...exp, startDate: e.target.value })}
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => setExperience(i, { ...exp, endDate: e.target.value })}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => setExperience(i, { ...exp, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="w-full" onClick={addExperience}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </Section>

      <Separator />

      {/* ---- Education ---- */}
      <Section icon={GraduationCap} title="Education">
        {data.education.length === 0 && (
          <p className="text-sm text-muted-foreground">No education entries yet. Add one below.</p>
        )}

        {data.education.map((edu, i) => (
          <Card key={i}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">
                {edu.degree || edu.institution
                  ? `${edu.degree}${edu.degree && edu.institution ? " — " : ""}${edu.institution}`
                  : `Education ${i + 1}`}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeEducation(i)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove education</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => setEducation(i, { ...edu, institution: e.target.value })}
                    placeholder="MIT"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => setEducation(i, { ...edu, degree: e.target.value })}
                    placeholder="B.S."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => setEducation(i, { ...edu, field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => setEducation(i, { ...edu, startDate: e.target.value })}
                      placeholder="2016"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) => setEducation(i, { ...edu, endDate: e.target.value })}
                      placeholder="2020"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="w-full" onClick={addEducation}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </Section>

      <Separator />

      {/* ---- Skills ---- */}
      <Section icon={Code} title="Skills">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            value={data.skills.join(", ")}
            onChange={(e) =>
              setField(
                "skills",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            placeholder="React, TypeScript, Node.js, Python"
          />
          <p className="text-xs text-muted-foreground">Separate skills with commas</p>
        </div>
      </Section>

      <Separator />

      {/* ---- Projects ---- */}
      <Section icon={FolderOpen} title="Projects">
        {data.projects.length === 0 && (
          <p className="text-sm text-muted-foreground">No project entries yet. Add one below.</p>
        )}

        {data.projects.map((proj, i) => (
          <Card key={i}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">
                {proj.name || `Project ${i + 1}`}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeProject(i)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove project</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={proj.name}
                    onChange={(e) => setProject(i, { ...proj, name: e.target.value })}
                    placeholder="My Awesome App"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input
                    value={proj.url}
                    onChange={(e) => setProject(i, { ...proj, url: e.target.value })}
                    placeholder="https://github.com/user/project"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => setProject(i, { ...proj, description: e.target.value })}
                  placeholder="Briefly describe what the project does..."
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Input
                  value={proj.technologies.join(", ")}
                  onChange={(e) =>
                    setProject(i, {
                      ...proj,
                      technologies: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="React, Tailwind, Prisma"
                />
                <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" className="w-full" onClick={addProject}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </Section>

      <Separator />

      {/* ---- Navigation ---- */}
      <div className="flex items-center justify-between pt-4 pb-8">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="button" onClick={onContinue}>
          Continue to Preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
