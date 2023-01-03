import { Checkbox, Col, Row } from 'antd'
import React from 'react'

const GroupCheckbox = ({options,onChange}) => {
  return (
    <Checkbox.Group
        style={{
          width: '100%',
        }}
        onChange={onChange}
      >
        <Row>
          {
            options?.map((option) => {
              return (
                <Col span={12}>
                  <Checkbox value={option?.value}>{option?.name}</Checkbox>
                </Col>
              )
            })
          }
        </Row>
      </Checkbox.Group>
  )
}

export default GroupCheckbox