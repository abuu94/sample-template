import NewTable from "@/components/layout/NewTable";
import {
  addProject,
  editProject,
  getProjects,
} from "@/components/service/project-service";

import { Project } from "@/components/types/tProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import {
  DownloadCloudIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  ViewIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import ViewProjectDialog from "./ViewProjectDialog";
import ProjectPreviewSheet from "./projectPreviewSheet";
import ProjectReportSheet from "./ProjectReportSheet";
import DownloadProjectReportDialog from "./DownloadProjectReportDialog";
import { jsPDF } from 'jspdf';
// hapa tuna control form
const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "projectName  must be at least 2 characters.",
  }),
  projectClient: z.string().min(2, {
    message: "projectClient  must be at least 2 characters.",
  }),
  startDate: z.string().min(2, {
    message: "startDate  must be at least 2 characters.",
  }),
  endDate: z.string().min(2, {
    message: "endDate  must be at least 2 characters.",
  }),

  status: z.string().min(2, {
    message: "status  must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup

export default function ProjectsReportDatatable() {
  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Project Name",
        accessorKey: "projectName",
      },
      {
        header: "Client Name",
        accessorKey: "projectClient",
      },
      {
        header: "Starting",
        accessorKey: "startDate",
      },
      {
        header: "Deadline",
        accessorKey: "endDate",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handlePreview(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDownload(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <DownloadCloudIcon className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [project, setProject] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Project[]>([]);
  const [action, setAction] = useState("");

  //view project modal
  const [isProjectPreviewSheetOpen, setisProjectPreviewSheetOpen] =
    useState(false);
  const [isDownloadReportModalOpen, setisDownloadReportModalOpen] =
    useState(false);
  const [projectSelected, setprojectSelected] = useState<Project>();

  const handleClose = () => {
    // setIsModalOpen(false);
    // setisEditUserModalOpen(false);
  };

  useEffect(() => {
    getProjects().then((projects) => {
      const projectsWithId = projects.map(
        (project: Project, index: number) => ({
          ...project,
          id: index + 1,
        })
      );
      setProject(projectsWithId);
      setFilteredData(projectsWithId);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      project.filter((project: Project) =>
        Object.values(project).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, project]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePreview = (project: Project) => {
    setprojectSelected(project);
    setisProjectPreviewSheetOpen(true);
    console.log("Preview Project:", project);
  };
  const handleDownload = (project: Project) => {
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("sample.pdf");
    setprojectSelected(project);
    setisDownloadReportModalOpen(true);
    console.log("View Project:", project);
  };
  return (
    <>
      <div className="flex justify-end space-x-2 mb-0">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md p-2"
        />
        <ProjectReportSheet
          open={isProjectPreviewSheetOpen}
          onOpenChange={() => setisProjectPreviewSheetOpen(false)}
          projectSelected={projectSelected}
        />
        <DownloadProjectReportDialog
          open={isDownloadReportModalOpen}
          onOpenChange={() => setisDownloadReportModalOpen(false)}
          projectSelected={projectSelected}
        /> 
      </div>

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
