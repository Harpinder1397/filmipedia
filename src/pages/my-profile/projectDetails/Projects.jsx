import { Row, Col, Button, message, Spin } from 'antd';
import { FiltersContext } from '../../../App';
import FormInput from '../../../common/inputs/FormInput';
import FormSelect from '../../../common/inputs/FormSelect';
import { useContext, useState, useEffect } from 'react';
import { getProjectsApi, createProjectApi, updateProjectApi, deleteProjectApi } from '../../../api/projects';
import PopConfirm from '../../../common/pop-confirm';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import ProjectModal from './ProjectModal';

import './projectDetailsStyle.less'
import { getCategoryApi } from '../../../api/getCategories';
import { useParams } from 'react-router-dom';

const Projects = () => {

  const [categories, setCategories] = useState({});
  const [createProject, setCreateProject] = useState({});
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('Add');
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const myUserId = localStorage.getItem('user');
  const { Id } = useParams();
  const userId = Id || myUserId;
  // GET PROJECTS LIST API
  const fetchProjects = async () => {
		const res = await getProjectsApi(userId);
    if(res){
      setProjects(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }else {
      setIsLoading(false);
    }
	}

  // ADD AND EDIT PROJECT API
  const handleAddProjectFun = async () => {
    if(!createProject.projectName || !createProject.category || !createProject.subCategory || !createProject.links){
      message.error('Please fill all mandatory fields!');
      return
    }
    if(modalTitle === 'Add'){
       // PROJECT ADD API
       setIsLoading(true);
      const payload = {...createProject, userId: userId }
      const res = await createProjectApi(payload);
      if(res){
         setIsVisibleModal(false);
         setCreateProject({});
         fetchProjects();
         setTimeout(() => {
          setIsLoading(false);
        }, 2000);
       }else {
        setIsLoading(false);
       }
    }
    if(modalTitle === 'Edit'){
      // PROJECT UPDATE API
      setIsLoading(true);
      const res = await updateProjectApi(createProject._id, createProject);
      if(res){
         setIsVisibleModal(false);
         setCreateProject({});
         fetchProjects();
         setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }else {
        setIsLoading(false);
      }
    }
   
  }
  
  // ADD PROJECT DELETE
  const handleDeleteProjectFun = async (id) => {
    setIsLoading(true);
    const res = await deleteProjectApi(id);
    if(res){
      fetchProjects();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }else {
      setIsLoading(false);
    }
  }

  const onChangeProjectFun = (e, type) => {
    if(type){
      setCreateProject({...createProject, [type]: e?.value});
      return
    }
    const { name, value } = e.target;
    setCreateProject({...createProject, [name]: value});
  }

  // ADD BUTTON FUNCTION
  const handleAddButtonFun = () => {
    setIsVisibleModal(!isVisibleModal);
    setModalTitle('Add')
  }

  // ADD EDIT FUNCTION
  const handleUpdateButtonFun = (project) => {
    setIsVisibleModal(true);
    setModalTitle('Edit')
    setCreateProject(project)
  }

  // MODAL CANCEL BUTTON FUNCTION
  const handleCancel = () => {
    setIsVisibleModal(false);
    setCreateProject({});
  }

  useEffect(() => {
    fetchProjects();
    getCategoryApi().then((data) => {
      setCategories(data);
    })
  }, [window.location.pathname])


  return (
    // <Row style={{ padding: '24px'}}>
    <>
    <Button onClick={handleAddButtonFun}> Add</Button>
    <Spin spinning={isLoading}>
      <Row gutter={[24, 24]} className='project-update-container' >
        {
          projects.length ?  projects.map((project) => (
            <>
              <Col xs={24} sm={12} md={8} lg={5} xxl={5} xl={5}>
                <FormInput
                  label={'Project Name'}
                  value={project.projectName}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} xxl={5} xl={5}>
                <FormSelect
                  label={'Category'}
                  className="navbar__tag-selector"
                  value={project.category}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} xxl={5} xl={5}>
                <FormSelect
                  label={'Sub Category'}
                  value={project.subCategory}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} xxl={5} xl={5} className="links-input">
                <FormInput
                  type="text"
                  label={'Links'}
                  // addonBefore={'https://'}
                  value={project.links}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={4} xxl={4} xl={4} className="project-details-button">
                <Button onClick={() => handleUpdateButtonFun(project)}>Update</Button>
                <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDeleteProjectFun(project._id)
                  }}
                  body={
                    <Button>Delete</Button>
                  }
                />
               
              </Col>
            </>
          )): (
            <EmptyMessage />
          )
        }
        
      </Row>
      </Spin>
      {/* PROJECT MODAL ADD AND EDIT */}
      <ProjectModal
        categories={categories}
        subCategoriesList={subCategoriesList}
        setSubCategoriesList={setSubCategoriesList}
        isVisibleModal={isVisibleModal}
        modalTitle={modalTitle}
        createProject={createProject}
        handleAddProjectFun={handleAddProjectFun}
        handleCancel={handleCancel}
        onChangeProjectFun={onChangeProjectFun}
      />
    </>
  )
}

export default Projects;