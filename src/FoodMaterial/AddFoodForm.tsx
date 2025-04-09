
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  calories: z.string().min(1, {
    message: "Calories must be at least 1.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddFoodForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });


  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await axios.post('http://localhost:3000/foods', data); 
      console.log('Food added:', data);
      toast.success('Food added successfully');
      handleClose();
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Error adding food');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="Enter food name"
              className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="category"
              type="text"
              placeholder="Enter food category"
              className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Calories
        </label>
        <Controller
          name="calories"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="calories"
              type="number"
              placeholder="Enter calories"
              className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
        {errors.calories && <p className="text-red-500 text-sm">{errors.calories.message}</p>}
      </div>
      <div className="space-y-2">
        <button
          type="submit"
          className="  w-full mt-4 bg-blue-500 text-white rounded-md px-4 py-2" 
          onClick={handleClose}
        >
          Add Food
        </button>
      </div>
    </form>
  );
};

export default AddFoodForm;