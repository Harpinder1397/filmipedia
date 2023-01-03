import React, { useEffect, useState } from "react";
import { Typography, Checkbox, Input, Row, Col, Divider, InputNumber } from "antd";
import FormSelect from "../inputs/FormSelect";
import './subCategoriesStyle.less';
import GroupCheckbox from "../group-checkbox/GroupCheckbox";
import { useStateQuery } from "../../api/getStatesQuery";
import { mapCities, mapStates } from "../../common/utils";
import { useLocation } from "react-router-dom";

const SubCategoryComponent = ({
  options,
  optionsCountries,
  formData,
  setFormData,
  title,
  name,
  onSelect,
  onClear,
  value,
  setSubCategories,
}) => {

  const { data } = useStateQuery();
  const [location, setLocation] = useState(undefined);
  const [subCategory, setSubCategory] = useState([]);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
  const locationPath = useLocation(); // React Hook
  const jobsLocation = locationPath.pathname.includes('jobs')
  useEffect(() => {
		const states = mapStates(data);
		setLocation(states);
	},[data])

	useEffect(() => {
		if(selectedState) {
			const cities = mapCities(data, selectedState)
			setCities(cities);
		}
	},[selectedState])

console.log(formData, 'formData formData')

  const locationFun = () => {
    return (
      <div className="location-filter">
      <FormSelect
          className="state-search-input"
          name="country"
          allowClear={true}
          placeholder="Select Country"
            value={formData?.country}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, country: val.value, state: null, city: null})
            }}
            onClear={() => setFormData({...formData, country: null, state: null, city: null})}
            options={options}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
          className="state-search-input"
          name="state"
          allowClear={true}
          placeholder="Select State"
            value={formData?.state}
            onSelect={(cat, val) => {
              setFormData({...formData, state: val?.value, city: null})
              setSelectedState(val?.value)
            }}
            onClear={() => {
              setFormData({...formData, state: null, city: null});
              setSelectedState('');
              setCities([]);
              
            }}
            options={location && Object.keys(location)?.map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select City"
            className="city-search-input"
						value={formData?.city}
            onSelect={(cat, val) => {
              setFormData({...formData, city: val.value})
            }}
						options={cities}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						// validationError={formDataErrors.city}
						width={"100%"}
					/>
      </div>
    );
  };
  console.log(formData, 'formData')

  const categoryFun = () => {
    return (
      <div className="location-filter">
        <FormSelect
          className="state-search-input"
          name="category"
          allowClear={true}
          placeholder="Select category"
          value={formData?.category}
          onSelect={(cat, val) => {
            // console.log(val, cat, 'val')
            if(jobsLocation){
              setFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: ''
                  });
                }else {
                setSubCategories(val.id);
                  setFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: '',
                    page: 1,
                    limit: 100
                  });
                }
                const getSubCategories = options.find(
                  (item) => item._id == val.id
                );
            setSubCategory(getSubCategories?.childern);
          }}
          onClear={() => {
            // setFormData({...formData, category: null, subCategory: null})
            setSubCategories('');
            setSubCategory([]);
            if(jobsLocation){
              setFormData({ ...formData, category: null, subCategory: null });
          }else {
            setFormData({ ...formData, category: null, subCategory: null, page: 1 });
          }
          }}
          options={options}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
          className="state-search-input"
          name="subCategory"
          allowClear={true}
          placeholder="Select sub category"
            value={formData?.subCategory}
            onSelect={(cat, val) => {
              setFormData({...formData, subCategory: val?.value})
              setSelectedState(val?.value)
            }}
            onClear={() => {
              setFormData({...formData, subCategory: null});
              setSelectedState('');
              setCities([]);
              
            }}
            options={formData?.category && subCategory}
          showSearch
          required
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
      </div>
    );
  };

  const dropdownSingleFun = () => {
    return (
      <div className="location-filter">
        <FormSelect
          className="state-search-input"
          name={name}
          allowClear={true}
          placeholder="Select"
          value={value}
          onSelect={onSelect}
          onClear={onClear}
          options={options}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
      </div>
    );
  };

  const experienceFun = () => {
      return (
        <div className="location-filter experience-filter">
          <FormSelect
            className="state-search-input"
            name="state"
            allowClear={true}
            placeholder="Select Minimum"
              value={formData?.experienceMinimum}
              onSelect={(cat, val) => {
                setFormData({...formData, experienceMinimum: val.value, experienceMaximum: (Number(val.value) + 5)})
              }}
              onClear={() => setFormData({...formData, experienceMinimum: '', experienceMaximum: ''})}
              options={options && Object.keys(options).map((item, idx) => {
                return {
                  id: idx,
                  value: item
                }
              })}
            showSearch
            required
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
            // validationError={formDataErrors.states}
            width="100%"
          />
          <FormSelect
              name="cities"
              placeholder="Select Maximum"
              className="city-search-input"
              value={formData?.experienceMaximum}
              showFilterValue={formData?.experienceMinimum}
              onSelect={(cat, val) => {
                setFormData({...formData, experienceMaximum: val.value})
              }}
              options={options && Object.keys(options).map((item, idx) => {
                return {
                  id: idx,
                  value: item
                }
              })}
              showSearch
              required
              filterOption={(input, option) => option.children.indexOf(input) >= 0 }
              // validationError={formDataErrors.city}
              width={"100%"}
              disabled={formData?.experienceMinimum ? false : true}
            />
        </div>
      );
    };
  const ageFun = () => {
    return (
      <div className="location-filter experience-filter">
        <FormSelect
          className="state-search-input"
          name="state"
          allowClear={true}
          placeholder="Select Minimum"
            value={formData?.ageMinimum}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, ageMinimum: val.value, ageMaximum: (Number(val.value) + 5)})
            }}
            onClear={() => setFormData({...formData, ageMinimum: '', ageMaximum: ''})}
            options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.indexOf(input) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select Maximum"
            className="city-search-input"
						value={formData?.ageMaximum}
            showFilterValue={formData?.ageMinimum}
            onSelect={(cat, val) => {
              setFormData({...formData, ageMaximum: val.value})
            }}
						options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
						showSearch
						required
						// validationError={formDataErrors.city}
						width={"100%"}
            disabled={formData?.ageMinimum ? false : true}
					/>
      </div>
    );
  };

  const weightFun = () => {
    return (
      <div className="location-filter experience-filter">
        <FormSelect
          className="state-search-input"
          name="weight"
          allowClear={true}
          placeholder="Select Minimum"
            value={formData?.weightMinimum}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, weightMinimum: val.value, weightMaximum: (Number(val.value) + 5)})
            }}
            onClear={() => setFormData({...formData, weightMinimum: '', weightMaximum: ''})}
            options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.indexOf(input) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select Maximum"
            className="city-search-input"
						value={formData?.weightMaximum}
            showFilterValue={formData?.weightMinimum}
            onSelect={(cat, val) => {
              setFormData({...formData, weightMaximum: val.value})
            }}
						options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
						showSearch
						required
						// validationError={formDataErrors.city}
						width={"100%"}
            disabled={formData?.weightMinimum ? false : true}
					/>
      </div>
    );
  };

  const heightFun = () => {
    return (
      <div className="location-filter experience-filter">
        <FormSelect
          className="state-search-input"
          name="height"
          allowClear={true}
          placeholder="Select Minimum"
            value={formData?.heightMinimum}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, heightMinimum: val.value, heightMaximum: (Number(val.value) + 5)})
            }}
            onClear={() => setFormData({...formData, heightMinimum: '', heightMaximum: ''})}
            options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.indexOf(input) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select Maximum"
            className="city-search-input"
						value={formData?.heightMaximum}
            showFilterValue={formData?.heightMinimum}
            onSelect={(cat, val) => {
              setFormData({...formData, heightMaximum: val.value})
            }}
						options={options && Object.keys(options).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
						showSearch
						required
						// validationError={formDataErrors.city}
						width={"100%"}
            disabled={formData?.heightMinimum ? false : true}
					/>
      </div>
    );
  };

  const budgetFun = () => {
    return (
      <div className="location-filter experience-filter">

        <FormSelect
          className="state-search-input"
          name="budget"
          allowClear={true}
          placeholder="Select Minimum"
            value={formData?.budgetMinimum}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, budgetMinimum: val.value, budgetMaximum: (Number(val.value) + 500)})
            }}
            onClear={() => setFormData({...formData, budgetMinimum: '', budgetMaximum: ''})}
            options={options}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.indexOf(input) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select Maximum"
            className="city-search-input"
						value={formData?.budgetMaximum}
            showFilterValue={formData?.budgetMinimum}
            onSelect={(cat, val) => {
              setFormData({...formData, budgetMaximum: val.value})
            }}
						options={options}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
						showSearch
						required
						// validationError={formDataErrors.city}
						width={"100%"}
            disabled={formData?.budgetMinimum ? false : true}
					/>
      </div>
    );
  };


  const checkboxFun = (title) => {
    return (
      <GroupCheckbox
        options={options}
        onChange={(e) => {
            setFormData({
              ...formData,
              [name]: e
            })
        }}
      />
    );
  };

  const renderFilter = () => {
    switch (title) {
      case "Location":
        return locationFun();
      case "Category":
        return categoryFun();
      case "Experience" : 
        return experienceFun()
      case "Age" : 
        return ageFun()
      case "Height" : 
        return heightFun()
      case "Weight" : 
        return weightFun()
      case "Budget" : 
        return budgetFun()
      case "Best In":
        return dropdownSingleFun()
      case "Eye Color":
        return dropdownSingleFun()
      case "Hair Color":
        return dropdownSingleFun()
      case "Extra Talent":
        return dropdownSingleFun()
      case "Skin Tone":
        return dropdownSingleFun()
      case "Available":
        return dropdownSingleFun()
      default:
        return checkboxFun(title);
    }
  };

  return (
    <div className="sub-categories-container">
    {/*  <div className="title">
      <Typography.Title level={3} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
          {title}
  </Typography.Title
      </div>> */}
      {/*<Divider orientation="left">{title}</Divider>*/}
      <div className="filter-container">{renderFilter()}</div>
    </div>
  );
};

export default SubCategoryComponent;
