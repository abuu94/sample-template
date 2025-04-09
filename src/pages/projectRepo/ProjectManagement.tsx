import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
export default function ProjectManagement() {
  const [selected, setSelected] = useState(people[3]);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <div className="App p-4">
          <Card>
            <CardContent>
              <div className="flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    alt="Project Logo"
                    className="w-12 mr-4"
                  />
                  <div>
                    <strong>Project Title:</strong>
                    <p>Ekamisheni Management System</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                    alt="Client Logo"
                    className="w-12 mr-4"
                  />
                  <div>
                    <strong>Client Name:</strong>
                    <p>Ministry of Laws and Constitution</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
        <div className="App p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Role Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="min-w-full w-full h-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Role
                      </th>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Assigned To
                      </th>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b border-gray-300">
                        Analyst
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-2">
                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                <img
                                  alt=""
                                  src={selected.avatar}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                  <div className="flex items-center">
                                    <img
                                      alt=""
                                      src={person.avatar}
                                      className="size-5 shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                      {person.name}
                                    </span>
                                  </div>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      <Button>Save</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b border-gray-300">
                        Designer
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-2">
                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                <img
                                  alt=""
                                  src={selected.avatar}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                  <div className="flex items-center">
                                    <img
                                      alt=""
                                      src={person.avatar}
                                      className="size-5 shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                      {person.name}
                                    </span>
                                  </div>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      <Button>Save</Button>
                      </td>
                    </tr>{" "}
                    <tr className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b border-gray-300">
                        Front-End
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-2">
                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                <img
                                  alt=""
                                  src={selected.avatar}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                  <div className="flex items-center">
                                    <img
                                      alt=""
                                      src={person.avatar}
                                      className="size-5 shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                      {person.name}
                                    </span>
                                  </div>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      <Button>Save</Button>
                      </td>
                    </tr>{" "}
                    <tr className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b border-gray-300">
                        Back-End
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-2">
                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                <img
                                  alt=""
                                  src={selected.avatar}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                  <div className="flex items-center">
                                    <img
                                      alt=""
                                      src={person.avatar}
                                      className="size-5 shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                      {person.name}
                                    </span>
                                  </div>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      <Button>Save</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b border-gray-300">
                        Manager
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-2">
                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                <img
                                  alt=""
                                  src={selected.avatar}
                                  className="size-5 shrink-0 rounded-full"
                                />
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                >
                                  <div className="flex items-center">
                                    <img
                                      alt=""
                                      src={person.avatar}
                                      className="size-5 shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                      {person.name}
                                    </span>
                                  </div>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      <Button>Save</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <table className="min-w-full w-full h-full bg-white border border-gray-300">
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
                </table> */}
                <table className="min-w-full w-full h-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Stage
                      </th>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Status
                      </th>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        Action
                      </th>
                      <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
                        DoneBy
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
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
                      <td className="py-2 px-4 border-b border-gray-300">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Incomplete">
                              Incomplete
                            </SelectItem>
                            <SelectItem value="Complete">Complete</SelectItem>
                            <SelectItem value="Inprogress">
                              Inprogress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Hassan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
