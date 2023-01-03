import { notification } from 'antd';

export const success = (section) => (
  notification.success({
    message: 'Success !',
    description: `${section} Details are updated successfully ..!`,
    placement: 'topRight',
  })
);
export const error = (section) => {
  notification.error({
    message: 'Error !',
    description: `Something went wrong in updating ${section} details, please try again later ..!`,
    placement: 'topRight',
  });
};

export const priceListError = (action) => {
  notification.error({
    message: 'Error..!',
    description: `Something went wrong in ${action} new Price. Please try again after some time.`,
    placement: 'topRight',
  });
};
export const priceListSuccess = (action) => {
  notification.success({
    message: 'Congratulations..!',
    description: `Price is ${action} successfully.`,
    placement: 'topRight',
  });
};
