import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Spin, Divider } from "antd";
import { DeleteOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { createCategoryApi, deleteCategoryApi, updateCategoryApi, updateBestInApi,updateExtraTalentApi, updateSubCategoryApi, updateTagsApi, updateFiltersApi, useFetchCategoryApiQuery, useGetCategoryApiQuery, updateSubCategoryByIdApi, updateTagsByIdApi, updateBestInByIdApi, updateExtraTalentByIdApi, deleteExtraTalentApi, deleteBestInApi, deleteFiltersApi, deleteTagsApi, deleteSubCategoryApi } from "../../api/getCategories";
import PopConfirm from "../../common/pop-confirm";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";
import FormSelect from "../../common/inputs/FormSelect";
import { useFiltersQuery, useUpdateFilterMutation } from "../../api/getAdminFilters";


const renderMethod = (payload, title, id) => {
  if (title === 'category') return createCategoryApi(payload);
  if (title === 'Sub-category') return updateSubCategoryApi(id, payload);
  if (title === 'tags') return updateTagsApi(id, payload);
  if (title === 'filters') return updateFiltersApi(id, payload);
  if (title === 'Best-In') return updateBestInApi(id, payload);
  if (title === 'Extra-Talent') return updateExtraTalentApi(id, payload);
}

const editRenderMethod = (payload, title, id, categoryId) => {
  if (title === 'category') return updateCategoryApi(categoryId, payload);
  if (title === 'Sub-category') return updateSubCategoryByIdApi(id, payload);
  if (title === 'tags') return updateTagsByIdApi(id, payload);
  if (title === 'Best-In') return updateBestInByIdApi(id, payload);
  if (title === 'Extra-Talent') return updateExtraTalentByIdApi(id, payload);
}

const AllCategories = () => {

  const { data: categories } = useGetCategoryApiQuery();
  const { mutate: getCategories, isLoading } = useFetchCategoryApiQuery();
  const { data: filtersList } = useFiltersQuery();
  const { mutate: fetchFilterMutation, isLoading: isLoading2 } = useUpdateFilterMutation();
  const [title, setTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isEditOptions, setIsEditOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories?.length && categories);
  // const [isLoading, setIsLoading] = useState(false);
  console.log(selectedCategory, 'selectedCategory')
  const fetchCategoriesList = () => {
    const updateSelectedCategory = categories?.find((item) => item?._id == selectedCategory?._id)
    setSelectedCategory(updateSelectedCategory ? updateSelectedCategory : selectedCategory)
  }

  const handleAdd = (type, id) => {
    setTitle(type);
    setIsVisible(true);
    setIsEdit(false);
    setIsEditOptions(false);
  }

  const fetchRenderMethodData = async (payload, title, selectedCategoryId) => {
    const res = await renderMethod(payload, title, selectedCategoryId);
    if(res){
      getCategories();
      setTitle('');
    fetchCategoriesList();
    }
  }


  const updateCategoryListApi = async(payload, title, selectedCategoryId, categoryId) => {
    console.log(payload, title, selectedCategoryId, 'payload, title, selectedCategoryId')
    const res = await editRenderMethod(payload, title, selectedCategoryId, categoryId);
    if(res){
      getCategories();
    fetchCategoriesList();
      setTitle('');
    }
  }

  const handleSave = () => {
    let payload = {};
    if ( title === 'category' ) {
      if (isEditOptions) {
        payload = {
          value: formData['category']
        }
      } else {
        payload = {
          key: formData['category'].toLowerCase().replace(' ', '-'),
          value: formData['category']
        }
      } 
      
    }
    if ( title === 'Sub-category') {
      if (isEditOptions) {
        payload = {_id:formData?._id ,key: formData?.key, value: formData['Sub-category']}
        // ?.map((item) => 
        // item.key === formData.key
        //   ? {...item, key: formData['Sub-category'].toLowerCase().replace(' ', '-'), value: formData[title]}
        //   : {...item}
        // )
      } else {
        payload = { key: formData['Sub-category'].toLowerCase().replace(' ', '-'), _id: new Date().valueOf(), value: formData[title] }
      } 
    }

    if ( title == 'tags') {
      if (isEditOptions) {
        payload = {_id:formData?._id ,key: formData?.key, value: formData['tags']}
        // payload = selectedCategory?.tags.map((item) => 
        // item.key === formData.key
        //   ? {...item, key: formData['tags'].toLowerCase().replace(' ', '-'), value: formData[title]}
        //   : {...item}
        // )
      } else {
        payload = { key: formData['tags'].toLowerCase().replace(' ', '-'), _id: new Date().valueOf(), value: formData[title]}
      } 
    } 

    if (title === 'filters') {
        payload = formData['filters']
        // payload = newPayload
    } 

    if (title === 'Best-In') {
      if (isEditOptions) {
        payload = {_id:formData?._id ,key: formData?.key, value: formData['Best-In']}
        // payload = selectedCategory?.bestIn.map((item) => 
        // item.key === formData.key
        //   ? {...item, key: formData['Best-In'].toLowerCase().replace(' ', '-'), value: formData[title]}
        //   : {...item}
        // )
      } else {
        payload = { key: formData['Best-In'].toLowerCase().replace(' ', '-'), _id: new Date().valueOf(), value: formData[title]}
      } 
    }

    if (title === 'Extra-Talent') {
      if (isEditOptions) {
        payload = {_id:formData?._id ,key: formData?.key, value: formData['Extra-Talent']}
        // payload = selectedCategory?.extraTalent.map((item) => 
        // item.key === formData.key
        //   ? {...item, key: formData['Extra-Talent'].toLowerCase().replace(' ', '-'), value: formData[title]}
        //   : {...item}
        // )
      } else {
        payload = { key: formData['Extra-Talent'].toLowerCase().replace(' ', '-'),_id: new Date().valueOf(), value: formData[title] }
      } 
    }
    
    isEdit ? 
    updateCategoryListApi(payload, title, selectedCategory?._id, formData?._id)
    : fetchRenderMethodData(payload, title, selectedCategory?._id)
    setIsVisible(false);
    setFormData({});
    getCategories();

  }

  

  const handleEdit = (entity, type) => {


    if (type == 'category') {
      setFormData({...entity, 'category': entity.value})
      setTitle(type);
    // setIsVisible(true);
      setIsEditOptions(true);
      setIsEdit(true);
    }
    if (type == 'Sub-category') {
      setFormData({...entity, [type]: entity.value})
      setTitle(type);
      setIsEditOptions(true);
      // setIsVisible(true);
      setIsEdit(true);
    }
    if (type == 'tags') {
      setFormData({...entity, [type]: entity.value})
      setTitle(type);
      setIsEditOptions(true);
      // setIsVisible(true);
      setIsEdit(true);
    }
    if (type == 'Best-In') {
      setFormData({...entity, [type]: entity.value})
      setTitle(type);
      setIsEditOptions(true);
      // setIsVisible(true);
      setIsEdit(true);
    }

    if (type == 'Extra-Talent') {
      setFormData({...entity, [type]: entity.value})
      setTitle(type);
      setIsEditOptions(true);
      // setIsVisible(true);
      setIsEdit(true);
    }
    
    // setFormData({...entity, 'category': entity.value})
    setTitle(type);
    setIsVisible(true);
    // setIsEdit(true);
    // const payload = {
    //   value: formData[title]
    // }
  }

  const fetchCategories = () => {
    getCategories();
    fetchCategoriesList();
    setTitle('');
  }

  const handleDelete = async(id, type) => {
    if(type == 'category' ){
      const res = await deleteCategoryApi(id)
      if(res){
        fetchCategories();
      }
    }
    if(type == 'Sub-category' ){
      const updateSubCategory = selectedCategory?.childern?.filter((item) => item?._id != id)
      const res = await deleteSubCategoryApi(selectedCategory?._id, updateSubCategory)
      if(res){
        fetchCategories();
      }
    }
    if(type == 'tags'){
      const updateTags = selectedCategory?.tags?.filter((item) => item?._id != id)
      const res = await deleteTagsApi(selectedCategory?._id, updateTags)
      if(res){
        fetchCategories();
      }
    }
    if(type == 'filters') {
      const updateFilters = selectedCategory?.filters?.filter((item) => item?.key != id)
      const res = await deleteFiltersApi(selectedCategory?._id, updateFilters)
      if(res){
        fetchCategories();
      }
    }

    if(type == 'Best-In') {
      const updateFilters = selectedCategory?.bestIn?.filter((item) => item?._id != id)
      const res = await deleteBestInApi(selectedCategory?._id, updateFilters)
      if(res){
        fetchCategories();
      }
    }

    if(type == 'Extra-Talent') {
      const updateFilters = selectedCategory?.extraTalent?.filter((item) => item?._id != id)
      const res = await deleteExtraTalentApi(selectedCategory?._id, updateFilters)
      if(res){
        fetchCategories();
      }
    }
   

  }

  const handleCancel = () => {
    setIsVisible(false);
    setFormData({});
    setTitle('')
  }

  useEffect(() => {
    fetchCategoriesList();
  },[categories]);

  useEffect(() => {
    fetchCategoriesList();
    getCategories();
    fetchFilterMutation();
  },[]);

  return (
    <Spin spinning={isLoading}>
    <div className="all-categories">
      <div className="category-container">
        <div className="title">
          <div>Categories</div>
          <FileAddOutlined 
            onClick={() => handleAdd('category')}
          />
        </div>
        
        {
          categories?.length ? categories?.sort((a, b) => a.value.localeCompare(b.value)).map((category, idx) => (
            <div className="single-category">
              <div className="name-container">
                <div className="serial-number">
                  {idx + 1}.
                </div>
                <div
                  className="cat-name"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.value}
                </div>
                <span style={{marginLeft: '5px' }}>{category?._id == selectedCategory?._id ? `(active)` : ''}</span>
              </div>
              <div className="action">
                <EditOutlined onClick={() => handleEdit(category, 'category')}/>
                <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDelete(category?._id, 'category')
                  }}
                  body={
                    <DeleteOutlined />
                  }
                />
              </div>
            </div>
          )) : <EmptyMessage /> 
        }
      </div>
      <div className="sub-category-container">
        <div className="title">
          <div>Sub Categories</div>
          <FileAddOutlined 
            onClick={() => handleAdd('Sub-category')}
          />
        </div>
        {
          categories?.find((cat) => cat?._id === selectedCategory?._id)?.childern?.length ? categories?.find((cat) => cat?._id === selectedCategory?._id)?.childern?.map((subCat, idx) => (
            <div className="single-sub-cat">
              <div className="name-container">
                <div className="serial-number">
                  {idx + 1}.
                </div>
                <div
                  className="cat-name"
                  onClick={() => null}
                >
                  {subCat.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined onClick={() => handleEdit(subCat, 'Sub-category')} />
                <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDelete(subCat?._id, 'Sub-category')
                  }}
                  body={
                    <DeleteOutlined />
                  }
                />
              </div>
            </div>
          )) : <EmptyMessage /> 
        }
      </div>
      <div className="tags-container">
        <div className="title">
          <div>Tags</div>
          <FileAddOutlined
            onClick={() => handleAdd('tags')}
          />
        </div>
        <div className="half-container">
        {
          categories?.find((cat) => cat?._id === selectedCategory?._id)?.tags?.length ? categories?.find((cat) => cat?._id === selectedCategory?._id)?.tags?.map((tag, idx) => (
            <div className="single-tag">
              <div className="name-container">
                <div className="serial-number">
                  {idx + 1}.
                </div>
                <div
                  className="cat-name"
                  onClick={() => null}
                >
                  {tag.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined onClick={() => handleEdit(tag, 'tags')}/>
                <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDelete(tag?._id, 'tags')
                  }}
                  body={
                    <DeleteOutlined />
                  }
                />
              </div>
            </div>
          )) : <EmptyMessage /> 
        }
        </div>
        <Divider />
        <div>
        <div className="title">
          <div>Best In</div>
          <FileAddOutlined
            onClick={() => handleAdd('Best-In')}
          />
        </div>
        {
          categories?.find((cat) => cat?._id === selectedCategory?._id)?.bestIn?.length ? categories?.find((cat) => cat?._id === selectedCategory?._id)?.bestIn?.map((bestIn, idx) => (
            <div className="single-tag">
              <div className="name-container">
                <div className="serial-number">
                  {idx + 1}.
                </div>
                <div
                  className="cat-name"
                  onClick={() => null}
                >
                  {bestIn.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined onClick={() => handleEdit(bestIn, 'Best-In')}/>
                <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDelete(bestIn?._id, 'Best-In')
                  }}
                  body={
                    <DeleteOutlined />
                  }
                />
              </div>
            </div>
          )) : <EmptyMessage /> 
        }
      </div>
      </div>

      <div className="tags-container filters-container">
      <div className="title">
        <div>Filters</div>
        <FileAddOutlined
          onClick={() => handleAdd('filters')}
        />
      </div>
      <div className="half-container">
      {
        categories?.find((cat) => cat?._id === selectedCategory?._id)?.filters?.length ? categories?.find((cat) => cat?._id === selectedCategory?._id)?.filters?.map((filter, idx) => (
          <div className="single-tag">
            <div className="name-container">
              <div className="serial-number">
                {idx + 1}.
              </div>
              <div
                className="cat-name"
                onClick={() => null}
              >
                {filter.value}
              </div>
            </div>
            <div className="action">
              {/*<EditOutlined onClick={() => handleEdit(filter, 'filters')}/>*/}
              <PopConfirm
                title='Are you sure?'
                onConfirm={() => {
                  handleDelete(filter?.key, 'filters')
                }}
                body={
                  <DeleteOutlined />
                }
              />
            </div>
          </div>
        )) : <EmptyMessage /> 
      }
      </div>

      <Divider />
      <div className="title">
      <div>Extra Talent</div>
      <FileAddOutlined
        onClick={() => handleAdd('Extra-Talent')}
      />
    </div>
      {
        categories?.find((cat) => cat?._id === selectedCategory?._id)?.extraTalent?.length ? categories?.find((cat) => cat?._id === selectedCategory?._id)?.extraTalent?.map((extraTalent, idx) => (
          <div className="single-tag">
            <div className="name-container">
              <div className="serial-number">
                {idx + 1}.
              </div>
              <div
                className="cat-name"
                onClick={() => null}
              >
                {extraTalent.value}
              </div>
            </div>
            <div className="action">
              <EditOutlined onClick={() => handleEdit(extraTalent, 'Extra-Talent')}/>
              <PopConfirm
                title='Are you sure?'
                onConfirm={() => {
                  handleDelete(extraTalent?._id, 'Extra-Talent')
                }}
                body={
                  <DeleteOutlined />
                }
              />
            </div>
          </div>
        )) : <EmptyMessage /> 
      }
    </div>
      <AddCatContentModal
        isVisible={isVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setFormData={setFormData}
        formData={formData}
        field={title}
        title={isEdit ? `Edit ${title}` : `Add ${title}`}
        filtersList={filtersList}
        isEditOptions={isEditOptions}
      />
    </div>
    </Spin>
  )
}

export default AllCategories;

export const AddCatContentModal = (props) => {

  const {
    isVisible,
    handleSave,
    handleCancel,
    setFormData,
    formData,
    field,
    title,
    filtersList,
    isEditOptions
  } = props;

  return (
    <Modal
      visible={isVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      title={title}
      className="filters-modal-container"
    >
        {field == 'filters' && !isEditOptions ? (
          <FormSelect
          name={field}
          label="Filters"
          mode="tags"
          value={formData[field]}
          onChange={(e) => {
            const filteredKeywords = filtersList?.filter((word) => e?.includes(word?.value));
            setFormData({...formData, [field]: filteredKeywords});
          }}
          options={filtersList}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.languages}
          width={"100%"}
        />
        ) : (
          <Form.Item label={field}>
              <Input
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              value={formData[field]}
              name={field}
            />
          </Form.Item>
        )
      }
       
    </Modal>
  )
}