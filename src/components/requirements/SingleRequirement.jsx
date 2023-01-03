import React from 'react';
const SingleRequirement = ({requirement}) => {

	return (
		<div className="singleRequirement-container">
            <div>
                {requirement.required} {requirement.what} {requirement.required > 1 ? 'are' : 'is'} required for {requirement.location}
            </div>
            <div className="view-detail">
                view full Details
            </div> 
		</div>
	)
}

export default SingleRequirement;