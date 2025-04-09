// import { editFood } from "@/components/service/food-service";
// import { Food } from "@/components/types/tFood";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,

// } from "@/components/ui/dialog";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { DialogProps } from "@radix-ui/react-dialog";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Foodname  must be at least 2 characters.",
//   }),
//   category: z.string().min(2, {
//     message: "Lastname must be at least 2 characters.",
//   }),
//   calories: z.coerce.number().int().positive(),
// });

// type FormSchema = z.infer<typeof formSchema>;

// type Props = DialogProps & {
//   foodSelected?: Food;
// };

// const EditFoodDialog = ({ onOpenChange, open, ...props }: Props) => {
//   const onSubmit: SubmitHandler<FormSchema> = async (data) => {  
    
    
    
//    const ab =  editFood(data, props?.foodSelected?.id ?? 0)
//    console.log(ab);
   

//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,setValue,
//   } = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       calories: 0,
//     },
//   });

//   if (props.foodSelected){
//     setValue("name",props.foodSelected.name)
//     setValue("category",props.foodSelected.category)
//     setValue("calories",props.foodSelected.calories)  
//   }
//   const handleClose = () => {
//     onOpenChange?.(false);
//     reset()
//   };

//   return (
//     <Dialog  open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogTitle>Edit Food</DialogTitle>
//         <DialogDescription>
//           Fill in the details below to add a new food.
//         </DialogDescription>
//         <form  className="space-y-6">
//           <div className="space-y-2">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Food Name
//             </label>
//             <Controller
//               name="name"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="name"
//                   type="text"
//                   placeholder="Enter Name"
//                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               )}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Category
//             </label>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="category"
//                   type="text"
//                   placeholder="Enter Category "
//                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               )}
//             />
//             {errors.category && (
//               <p className="text-red-500 text-sm">{errors.category.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label
//               htmlFor="calories"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Calories
//             </label>
//             <Controller
//               name="calories"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="calories"
//                   type="number"
//                   placeholder="Enter Calories"
//                   className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               )}
//             />
//             {errors.calories && (
//               <p className="text-red-500 text-sm">{errors.calories.message}</p>
//             )}
//           </div>

//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="bg-gray-500 text-white rounded-md px-4 py-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white rounded-md px-4 py-2"
//               onClick={handleSubmit(onSubmit)}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditFoodDialog;
