import CommonCard from "../../common/common-card";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";
import { Row, Spin } from "antd";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


const CommonScroll = ({allUsers, userNameMutation }) =>  {
  const [state13, setState13] = useState(15);
    const [state, setState] = useState({
    items: Array.from({ length: 20 })
  })
  console.log(state?.items?.length, 'state?.items?.length')
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      // alert('hello')
      // setState13(state13 + 15);
      // userNameMutation(state13);
        // state13 < 3 ? setState({items: state.items.concat(Array.from({ length: 20 }))}): setState(state)

    }, 1500);
  };

    return (
      <div>
        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={10}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={<h4>end...</h4>}
            // scrollableTarget="scrollableDiv"
          >
          <Spin spinning={false}>
              <div className="list-container">
                <Row>
                  <div className="second-list-container">
              
                    {
                      allUsers?.users ? allUsers.users?.map((user, index) => 
                         <CommonCard
                          user={user}
                          key={index}
                          // favList={data}
                          // handleFavourite={handleFavourite}
                          // handleRemoveFavourite={handleRemoveFavourite}
                          // isFav={isFav}
                        />
                      ) : <EmptyMessage />
    }
    </div>
    </Row>
  </div>
</Spin>
            
          </InfiniteScroll>
        </div>
      </div>
    );
}

export default CommonScroll;
