// import React, { useState, useEffect, useContext } from 'react';
// import './App.less';
// import { useRouteMatch, Route, Link, Switch } from 'react-router-dom';
// import CompleteList from './pages/complete-list';
// import SubCategoryComponent from './common/SubCategories';
// import { Row, Col, Typography, Checkbox } from 'antd';
// import { WarningOutlined } from '@ant-design/icons';
// import ShortListedProfiles from './pages/shortlisted-profiles';
// import LoginRoute from './routes/LoginRoute';
// import { FiltersContext } from './App';
// import banner from './assets/images/banner.png'
// // import NotFound from 'pages/not-found';
// // import ProducerList from 'pages/producer/list';
// // import DirectorList from 'pages/director/list';

// function App() {
//   const [profileCompleted, setProfileCompleted] = useState(false)
// 	const { selectedSubCategories } = useContext(FiltersContext)
//   const match = useRouteMatch();
//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     const isProfileCompleted = localStorage.getItem('isProfileCompleted');
//     setProfileCompleted(isProfileCompleted) 
//   }, [])

//   return (
//     <div className="body-layout">
//       <Row>
//       <Col span={4} className='left-side-bar'>
//           {
//             selectedSubCategories?.length ?
//             <div className="sub-categories-container br-left">
//               <div className="title br-left">
//                 <Typography.Title level={3}>Sub Category</Typography.Title>
//               </div>           
//               <div className="filter-container">
//                 {
//                   selectedSubCategories.map((subCat) =>
//                     <Checkbox 
//                       onChange={(e)=>console.log('event', e.target.value)} 
//                       value={subCat.id}
//                       style={{ marginTop: '20px'}}
//                     >
//                       <span style={{ fontSize: '16px' }}>{subCat.value}</span>
//                     </Checkbox>
//                   )
//                 }
//               </div>
          
              
//             </div> : null 
//           }
//           <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
//           <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
//           <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
//           <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
      
//         </Col>
//         <Col span={16}>
//           <Switch>
//             <Route path={`${match.path}`} component={CompleteList} />           
//             <LoginRoute path={`${match.path}/shortlisted`} component={ShortListedProfiles} />
//           </Switch>
//         {
//           !token
//             ? null
//             : (!profileCompleted
//               ? null
//               : (
//                 <div style={{ position: 'fixed', bottom: 130, right: 100, backgroundColor: 'orange', padding: 24 }}>
//                   <Link to="/my-profile">
//                     <WarningOutlined />
//                     Please complete your profile.
//                   </Link>
//                 </div>
//               ))
//         }
//         </Col>

//         <Col span={4}>
//           <img src={banner} width={'100%'}/>
//           {/* <SubCategoryComponent subCategoryFilter={selectedSubCategories} /> */}
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default App;
