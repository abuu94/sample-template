import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,

} from "@/components/ui/card";


export default function ProjectTeam() {
  return (
    <Card className="p-0 border-0">
    <CardContent className="p-0">
      <table className="min-w-full w-full h-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
              Name
            </th>
            <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
              Role
            </th>
            <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-200">
            <td className="py-2 px-4 border-b border-gray-300">
              Ali
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              Analyst
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <Button>Remove</Button>
            </td>
          </tr>

          <tr className="hover:bg-gray-200">
            <td className="py-2 px-4 border-b border-gray-300">
              Ahmad
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              Designer
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <Button>Remove</Button>
            </td>
          </tr>

          <tr className="hover:bg-gray-200">
            <td className="py-2 px-4 border-b border-gray-300">
              Awaadh
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              Front-end
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <Button>Remove</Button>
            </td>
          </tr>

          <tr className="hover:bg-gray-200">
            <td className="py-2 px-4 border-b border-gray-300">
              Asma
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              Back-end
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <Button>Remove</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
  );
}
