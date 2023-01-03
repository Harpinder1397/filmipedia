import React from 'react';
import SingleRequirement from "./SingleRequirement";

const Requirements = ({requirements}) => {

	return (
		<div className="requirements-container">
            <div className="title">
                <div>
                    Requirements
                </div>
                <div className="view-detail">
                    View All
                </div>
            </div>
            
            <div>
            {
				requirements && requirements.length && requirements.map((requirement) => 
					<SingleRequirement requirement={requirement} />
				)
			}
            </div>
		</div>
	)
}

export default Requirements;