import {
  Card,
  CardContent,
} from "@/components/ui/card";



const ProjectStage =()=> {
  return (
   
        <Card className="p-0 border-0">
                        <CardContent className="p-0">
                          <table className="min-w-full w-full h-full bg-white border border-gray-300">
                            <thead>
                              <tr>
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                                  Stage
                                </th>
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Analysis
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                    Complete
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Design
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/10 ring-inset">
                                    Complete
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Coding
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/10 ring-inset">
                                    Complete
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Testing
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/10 ring-inset">
                                    OnProgres
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Deployment
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                    Incomplete
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-gray-300">
                                  Finished
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                    Incomplete
                                  </span>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </CardContent>
                      </Card>
   
  );
};
export default ProjectStage;
