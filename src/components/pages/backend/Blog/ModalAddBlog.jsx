import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import { ImagePlusIcon, Minus, Plus, X } from "lucide-react";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { StoreContext } from "@/components/store/storeContext";
import {
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/storeAction";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { imgPath } from "@/components/helpers/functions-general";
import useQueryData from "@/components/custom-hook/useQueryData";
const ModalAddBlog = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);


  const queryClient = useQueryClient();

  const { uploadPhoto, handleChangePhoto, photo } =
  useUploadPhoto("/v2/upload-photo");




  const mutation = useMutation({
    
    mutationFn: (values) =>
      useQueryData(
        itemEdit ? `/v2/blog/${itemEdit.blog_aid}` : `/v2/blog`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });


      // show error box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });


  const handleClose = () => dispatch(setIsAdd(false));


  const initVal = {
    blog_title: itemEdit ? itemEdit.blog_title : "",
    blog_category:itemEdit ? itemEdit.blog_category : "",
    blog_level: itemEdit ? itemEdit.blog_level : "",
    blog_serving: itemEdit ? itemEdit.blog_serving : "",
    blog_prep_time: itemEdit ? itemEdit.blog_prep_time : "",
    blog_description: itemEdit ? itemEdit.blog_description : "",
    blog_instruction: itemEdit ? itemEdit.blog_instruction : "",

    blog_title_old: itemEdit ? itemEdit.blog_title : "",


    blog_ingredients: itemEdit
    ? JSON.parse(itemEdit.blog_ingredients)
    : [{ ingredients: "", amount: "", unit: "" }],
  };
  const yupSchema = Yup.object({
    blog_title: Yup.string().required("required"),
    blog_category: Yup.string().required("required"),
    blog_level: Yup.string().required("required"),
    blog_serving: Yup.string().required("required"),
    blog_prep_time: Yup.string().required("required"),
    blog_description: Yup.string().required("required"),
    blog_instruction: Yup.string().required("required"),

  });

  return (
    <ModalWrapper>
      <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1300px] w-full rounded-md border border-line">
        <div className="modal-header flex gap-2 p-2 items-center border-b border-line mb-2 ">
          <span className="text-body">Add Blog</span>
          <button className="ml-auto" onClick={handleClose}>
            <X />
          </button>
        </div>
        <div className="modal-body p-4 ">
        <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                blog_image:
                  (itemEdit?.blog_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.blog_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.blog_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="grid grid-cols-[1fr,_1.5fr,_1.5fr] gap-5">
                    <div className="info">
                      <h3 className="mb-0">Information</h3>

                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                    {itemEdit === null && photo === null ? (
                      <div className="w-full  rounded-md flex justify-center items-center flex-col h-full">
                        <ImagePlusIcon
                          size={50}
                          strokeWidth={1}
                          className="opacity-20 group-hover:opacity-50 transition-opacity"
                        />
                        <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                          Upload Photo
                        </small>
                      </div>
                    ) : (
                      <img
                        src={
                          photo
                            ? URL.createObjectURL(photo) // preview
                            : imgPath + "/" + itemEdit?.blog_image // check db
                        }
                        alt="ramen photo"
                        className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto ${
                          mutation.isPending
                            ? "opacity-40 pointer-events-none"
                            : ""
                        }`}
                      />
                    )}


                    <InputPhotoUpload
                      name="photo"
                      type="file"
                      id="photo"
                      accept="image/*"
                      title="Upload photo"
                      onChange={(e) => handleChangePhoto(e)}
                      onDrop={(e) => handleChangePhoto(e)}
                      className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full ${
                        mutation.isPending ? "pointer-events-none" : ""
                      }`}
                    />
                  </div>
                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="blog_title"
                        />
                      </div>


                      <div className="input-wrap">
                        <InputSelect label="Category" name="blog_category">
                          <option value="" hidden>
                            Select Category
                          </option>
                          <option value="chicken">Chicken</option>
                          <option value="beef">Beef</option>
                          <option value="pasta">Pasta</option>
                        </InputSelect>
                      </div>
                      <div className="input-wrap">
                        <InputSelect label="Level" name="blog_level">
                          <option value="" hidden>
                            Select Level
                          </option>
                          <option value="easy">Easy</option>
                          <option value="moderate">Moderate</option>
                          <option value="difficult">Difficult</option>
                        </InputSelect>
                      </div>


                      <div className="input-wrap">
                        <InputText
                          label="Serving"
                          type="text"
                          name="blog_serving"
                        />
                      </div>


                      <div className="input-wrap">
                        <InputText
                          label="Prep Time"
                          type="text"
                          name="blog_prep_time"
                        />
                      </div>
                    </div>


                    <div className="ingredient">
                      <FieldArray
                        name="blog_ingredients"
                        render={({ push, remove }) => (
                          <div className="input-wrap">
                            <div className="flex justify-between items-center">
                              <h3 className="mb-0">Ingredients</h3>
                              <button
                                className="bg-alert  p-1 px-2 text-sm rounded-md" type="button"
                                onClick={() =>
                                  push({
                                    ingredients: "",
                                    amount: "",
                                    unit: "",
                                  })
                                }
                              >
                                Add
                              </button>
                            </div>


                            <div className="overflow-y-auto custom-scroll max-h-[500px] h-full pr-2">
                              {props.values.blog_ingredients.map(
                                (ingredients, index) => (
                                  <div
                                    className="grid grid-cols-[1fr,_.3fr,_.8fr_.2fr] gap-3 mt-3"
                                    key={index}
                                  >
                                    <div>
                                      <label htmlFor="">ingredients</label>
                                      <Field
                                        name={`blog_ingredients[${index}].ingredients`}
                                      />
                                    </div>


                                    <div>
                                      <label htmlFor="">Amount</label>
                                      <Field
                                        name={`blog_ingredients[${index}].amount`}
                                      />
                                    </div>


                                    <div>
                                      <label htmlFor="">Unit</label>
                                      <Field
                                        name={`blog_ingredients[${index}].unit`}
                                      />
                                    </div>


                                    <button
                                      className="size-[33px] bg-accent text-white rounded-md center-all self-end"
                                      onClick={() => remove(index)}
                                    >
                                      <Minus />
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      />
                    </div>


                    <div className="instruction">
                      <div className="input-wrap">
                        <h3>Description</h3>
                        <InputTextArea
                          label="Description"
                          name="blog_description"
                          className="overflow-y-auto custom-scroll p-2 !h-[120px] outline-none  w-full rounded-md bg-primary text-body border border-line resize-none mb-5"
                        />
                      </div>
                      <div className="input-wrap">
                        <h3>Instruction</h3>
                        <InputTextArea
                          label="Instruction"
                          name="blog_instruction"
                          className="overflow-y-auto custom-scroll p-2 !h-[300px]  outline-none  w-full rounded-md bg-primary text-body border border-line resize-none"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="flex justify-end gap-3 mt-5">
                    <button className="btn btn-accent" type="submit">
                      {mutation.isPending &&  <SpinnerButton /> }
               {itemEdit ? "Save" : "Add"}
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={handleClose}
                      type="reset"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalWrapper>
  );
};


export default ModalAddBlog;





