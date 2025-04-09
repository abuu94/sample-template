

<Card title="User Table">
                  <CardHeader className="flex justify-between items-left">
                  
                          
                        {/* <div className="flex justify-end space-x-2 mb-0">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={search}
                              onChange={handleSearchChange}
                              className="border border-gray-300 rounded-md p-2"
                            />
                            <Dialog
                              open={isModalOpen}
                              onOpenChange={setIsModalOpen}
                            >
                              <DialogTrigger asChild>
                                <button className="flex bg-blue-500 text-white rounded-md px-4 py-2">
                                  Add Food <PlusIcon className="ml-2" />
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Add New Food</DialogTitle>
                                <DialogDescription>
                                  Fill in the details below to add a new food
                                  item.
                                </DialogDescription>
                                <form
                                  onSubmit={handleSubmit(onSubmit)}
                                  className="space-y-6"
                                >
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
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
                                    {errors.name && (
                                      <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="category"
                                      className="block text-sm font-medium text-gray-700"
                                    >
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
                                    {errors.category && (
                                      <p className="text-red-500 text-sm">
                                        {errors.category.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="calories"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Calories
                                    </label>
                                    <Controller
                                      name="calories"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="calories"
                                          
                                          placeholder="Enter calories"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.calories && (
                                      <p className="text-red-500 text-sm">
                                        {errors.calories.message}
                                      </p>
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
                                      Add Food
                                    </button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </div> */}
                   
                  </CardHeader>
                  <CardContent>
                    <NewTableSearchAdded
                      columns={columns}
                      data={filteredData}
                    />
                  </CardContent>
                </Card>