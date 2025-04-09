import NewTable from "@/components/layout/NewTable";
import { addProject, editProject, getProjects } from "@/components/service/project-service";

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
import { EditIcon, EyeIcon, PlusIcon, TrashIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import ViewProjectDialog from "./ViewProjectDialog";
import ProjectPreviewSheet from "./projectPreviewSheet";




// hapa tuna control form
const formSchema = z.object({
    projectName:  z.string().min(2, {
      message: "projectName  must be at least 2 characters.",
    }),
    projectClient:  z.string().min(2, {
        message: "projectClient  must be at least 2 characters.",
      }),
      startDate: z.string().min(2, {
        message: "startDate  must be at least 2 characters.",
      }),
      endDate: z.string().min(2, {
        message: "endDate  must be at least 2 characters.",
      }),
 
      status:  z.string().min(2, {
        message: "status  must be at least 2 characters.",
      }),
      
});

type FormSchema = z.infer<typeof formSchema>;

// hapo tunatumia zod au yup

export default function ProjectsDatatable() {
  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        header: "ID",
       accessorKey: 'id',
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
              onClick={() => handleView(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <ViewIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button onClick={() => handleDelete(Number(row.original.id))}>
              <TrashIcon className="w-5 h-5" />
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("")
  
  //view project modal
  const [isProjectPreviewSheetOpen, setisProjectPreviewSheetOpen] = useState(false);
  const [isViewUserModalOpen, setisViewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setisEditUserModalOpen] = useState(false);
  const [projectSelected, setuserSelected] = useState<Project>();

  const handleClose = () => {
    setIsModalOpen(false);
    // setisEditUserModalOpen(false);
  };

  useEffect(() => {
    getProjects().then((projects) => {
      const projectsWithId = projects.map((project: Project, index: number) => ({
        ...project,
        id: index + 1,
      }));
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectClient: "",
      startDate: "",
      endDate: "",
      status: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if(action === "edit"){
      const ab = await editProject(data, projectSelected?.id ?? 0).then((response) => {
          setProject((prevFood) => [...prevFood.filter(f=>f.id!=response.id),response].sort((a, b) =>a.id - b.id));
        setisEditUserModalOpen(false);
      });
  
    console.log(ab); 
    } else {
      try {
        const newFood = {
          ...data,
          id: project.length ? Math.max(...project.map((f) => Number(f.id))) + 1 : 1,
        };
        const response = await axios.post<Project>(
          "http://localhost:3000/users",
          newFood
        );
        setProject((prevFood) => [...prevFood, response.data]);
        console.log("Successfully added project:", response.data);
        toast.success("Project added successfully!");
        handleClose();
        reset();
      } catch (error) {
        console.error("Error adding project:", error);
        toast.error("Failed to add project.");
        handleClose();
        reset();
      }

    }
  };


  const handlePreview = (project: Project) => {
    setuserSelected(project);
    setisProjectPreviewSheetOpen(true);
    console.log("Preview Project:", project);
  };



  const handleView = (project: Project) => {
    setuserSelected(project);
    setisViewUserModalOpen(true);
    console.log("View Project:", project);

  };



  const handleEdit = (project: Project) => {
    setAction("edit")
    setuserSelected(project);
    setisEditUserModalOpen(true);
    setValue("projectName",project.projectName)
    setValue("projectClient",project.projectClient)
    setValue("startDate",project.startDate)  
    setValue("endDate",project.endDate)
    setValue("status",project.status)
    console.log("Edit Project:", project);
  };

 
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setProject((prevUser) => prevUser.filter((project) => project.id !== id));
      toast.success("Food Project deleted successfully!");
      console.error("Success deleting Food Project:");

    } catch (error) {
      console.error("Error deleting Food Project:", error);
      toast.error("Failed to delete Food Project.");
    }
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

        <ProjectPreviewSheet
         open={isProjectPreviewSheetOpen}
         onOpenChange={() => setisProjectPreviewSheetOpen(false)}
         projectSelected={projectSelected} 
        
        />

        <ViewProjectDialog
          open={isViewUserModalOpen}
          onOpenChange={() => setisViewUserModalOpen(false)}
          projectSelected={projectSelected}
        /> 

        {/* editUserDialog start */}
        <Dialog
          open={isEditUserModalOpen}
          onOpenChange={setisEditUserModalOpen}
        >
          <DialogContent>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new project.
            </DialogDescription>
            <form className="space-y-6">
            <div className="space-y-2">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project projectName
                </label>
                <Controller
                  name="projectName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="projectName"
                      type="text"
                      placeholder="Enter projectName"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.projectName && (
                  <p className="text-red-500 text-sm">{errors.projectName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="projectClient"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Client
                </label>
                <Controller
                  name="projectClient"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="projectClient"
                      type="text"
                      placeholder="Enter projectClient"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.projectClient && (
                  <p className="text-red-500 text-sm">{errors.projectClient.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Starting
                </label>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="startDate"
                      type="date"
                      placeholder="Enter startDate"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  endDate
                </label>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="endDate"
                      type="date"
                      placeholder="Enter endDate"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="status"
                      type="text"
                      placeholder="Enter status"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
            

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* editUserDialog end */}

        {/* addFoodDialog start */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
              Add New Project <PlusIcon className="ml-2" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new project.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project projectName
                </label>
                <Controller
                  name="projectName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="projectName"
                      type="text"
                      placeholder="Enter projectName"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.projectName && (
                  <p className="text-red-500 text-sm">{errors.projectName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="projectClient"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project projectName
                </label>
                <Controller
                  name="projectClient"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="projectClient"
                      type="text"
                      placeholder="Enter projectClient"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.projectClient && (
                  <p className="text-red-500 text-sm">{errors.projectClient.message}</p>
                )}
              </div>
           
              <div className="space-y-2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Starting
                </label>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="startDate"
                      type="date"
                      placeholder="Enter startDate"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  endDate
                </label>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="endDate"
                      type="date"
                      placeholder="Enter endDate"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
             
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="status"
                      type="text"
                      placeholder="Enter status"
                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
             
             

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Add Project
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
         {/* addFoodDialog start */}
      </div>

      <NewTable columns={columns} data={filteredData} />
    </>
  );
}
