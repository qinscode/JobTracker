"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  IconDownload,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Resume = {
  id: number;
  name: string;
  version: string;
  lastModified: string;
  targetRole?: string;
  targetCompany?: string;
};

export default function Resumes() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: 1,
      name: "Software Engineer Resume",
      version: "v1.2",
      lastModified: new Date().toISOString(),
      targetRole: "Frontend Developer",
    },
    {
      id: 2,
      name: "Tech Lead Resume",
      version: "v2.0",
      lastModified: new Date().toISOString(),
      targetRole: "Tech Lead",
    },
  ]);

  const handleDelete = (id: number) => {
    setResumes(resumes.filter(resume => resume.id !== id));
    toast({
      title: "Resume Deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  return (

    <div className="space-y-4">
      <Button
        className="w-full sm:w-auto"
        onClick={() => router.push("create")}
      >
        <IconPlus className="mr-2" />
        Add New Resume
      </Button>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map(resume => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{resume.name}</span>
                <span className="text-sm text-muted-foreground">
                  {resume.version}
                </span>
              </CardTitle>
              <CardDescription>
                Last modified:
                {" "}
                {new Date(resume.lastModified).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resume.targetRole && (
                  <p className="text-sm">
                    Target Role:
                    {" "}
                    {resume.targetRole}
                  </p>
                )}
                {resume.targetCompany && (
                  <p className="text-sm">
                    Target Company:
                    {" "}
                    {resume.targetCompany}
                  </p>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <IconDownload className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`${resume.id}/edit`)}
                  >
                    <IconEdit className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(resume.id)}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  );
}
