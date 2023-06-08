import React from 'react';

const FoodPizza = (props) => {
  return (
    <svg className={props.className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.62602 0.751221C7.5956 0.751221 6.74944 1.59313 6.74944 2.62496C6.74944 3.30245 7.11796 3.89207 7.6608 4.22231L0.84476 21.5423C0.750485 21.7692 0.724408 22.0186 0.769721 22.26C0.815035 22.5014 0.929774 22.7244 1.09988 22.9016C1.27699 23.0709 1.49953 23.185 1.74037 23.2301C1.98121 23.2751 2.22996 23.2491 2.45629 23.1553L19.7763 16.3392C19.9417 16.6156 20.1757 16.8445 20.4555 17.0039C20.7354 17.1633 21.0516 17.2478 21.3737 17.2492C22.4055 17.2492 23.2517 16.4073 23.2517 15.3754C23.2517 7.30222 16.6992 0.751221 8.62602 0.751221ZM9.74998 8.24901C9.74998 7.07261 8.96618 6.05778 7.87199 5.73321L8.36664 4.47885C8.45168 4.49019 8.53814 4.4987 8.62602 4.4987C10.4678 4.49769 12.2795 4.96492 13.8911 5.85648C15.5027 6.74805 16.8611 8.03468 17.8388 9.59549C18.1024 10.0377 18.7601 9.621 18.4724 9.19438C17.427 7.52667 15.975 6.15192 14.2527 5.19917C12.5304 4.24641 10.5943 3.7469 8.62602 3.7475C8.47814 3.74844 8.33154 3.72007 8.19469 3.66404C8.05784 3.60801 7.93344 3.52543 7.82867 3.42106C7.72391 3.31669 7.64086 3.19261 7.58431 3.05597C7.52776 2.91933 7.49885 2.77284 7.49922 2.62496C7.49866 2.47696 7.52744 2.33032 7.5839 2.19351C7.64036 2.05671 7.72338 1.93245 7.82817 1.82793C7.93295 1.72342 8.05741 1.64071 8.19436 1.58459C8.33131 1.52847 8.47802 1.50006 8.62602 1.501C16.2939 1.501 22.5019 7.709 22.5019 15.3769C22.5023 15.5249 22.4733 15.6715 22.4167 15.8082C22.36 15.9449 22.2768 16.0691 22.1719 16.1735C22.067 16.2779 21.9424 16.3604 21.8054 16.4164C21.6684 16.4723 21.5217 16.5005 21.3737 16.4994C21.2259 16.5002 21.0795 16.4716 20.9429 16.4154C20.8062 16.3591 20.6821 16.2763 20.5777 16.1718C20.4733 16.0673 20.3907 15.943 20.3346 15.8063C20.2786 15.6697 20.2502 15.5232 20.2511 15.3754C20.2511 14.4428 20.1392 13.5329 19.9322 12.6626C19.8401 12.1382 19.0478 12.3281 19.2037 12.837C19.3979 13.6505 19.4999 14.5009 19.4999 15.3754C19.4999 15.4633 19.5084 15.5498 19.5198 15.6348L9.30351 19.6544C9.16776 19.0785 8.84189 18.565 8.37849 18.197C7.91508 17.829 7.34119 17.6279 6.74944 17.6262C5.30375 17.6262 4.12451 18.804 4.12451 20.2497C4.12451 20.7104 4.24924 21.1597 4.47601 21.5537L2.18132 22.4579C1.93187 22.5572 1.75045 22.492 1.62856 22.3701C1.50808 22.2496 1.4443 22.0682 1.54351 21.8173L5.95856 10.5947C6.31857 10.7747 6.71543 10.8725 7.12504 10.8739C8.57074 10.8739 9.74998 9.6947 9.74998 8.24901ZM7.59702 6.43905C8.41341 6.64882 9.0002 7.38159 9.00161 8.24901C9.00284 8.57393 8.91929 8.89356 8.75922 9.17632C8.59914 9.45909 8.36809 9.69521 8.08886 9.86137C7.80963 10.0275 7.49189 10.118 7.16701 10.1238C6.84214 10.1296 6.52136 10.0506 6.23636 9.89455L7.59702 6.43905ZM12.0021 8.6246C11.9025 8.6246 11.807 8.66418 11.7366 8.73461C11.6661 8.80505 11.6265 8.90059 11.6265 9.0002C11.6265 9.09982 11.6661 9.19535 11.7366 9.26579C11.807 9.33623 11.9025 9.3758 12.0021 9.3758C12.1018 9.3758 12.1973 9.33623 12.2677 9.26579C12.3382 9.19535 12.3777 9.09982 12.3777 9.0002C12.3777 8.90059 12.3382 8.80505 12.2677 8.73461C12.1973 8.66418 12.1018 8.6246 12.0021 8.6246ZM18.5829 10.9916C18.6439 11.1291 18.702 11.2665 18.7572 11.4083C18.9245 11.9058 19.67 11.6124 19.4546 11.1333C19.3958 10.9837 19.3339 10.8353 19.2689 10.6883C19.0336 10.2177 18.4043 10.5508 18.5829 10.9902V10.9916ZM15.0027 10.4998C13.557 10.4998 12.3763 11.679 12.3763 13.1247C12.3763 14.5704 13.5584 15.7496 15.0027 15.7496C16.4484 15.7496 17.6276 14.5704 17.6276 13.1247C17.6276 11.679 16.4484 10.4998 15.0027 10.4998ZM15.0027 11.251C16.043 11.251 16.8778 12.0844 16.8778 13.1247C16.8778 14.165 16.043 14.9984 15.0027 14.9984C14.7562 14.9994 14.5119 14.9516 14.2839 14.8578C14.0559 14.764 13.8487 14.6261 13.6742 14.452C13.4996 14.2778 13.3613 14.0709 13.267 13.8432C13.1727 13.6154 13.1243 13.3712 13.1247 13.1247C13.1247 12.0844 13.9609 11.251 15.0013 11.251H15.0027ZM9.37721 11.6223C8.87922 11.6238 8.40206 11.8223 8.04992 12.1744C7.69779 12.5266 7.4993 13.0037 7.49781 13.5017C7.49781 14.5321 8.34396 15.3754 9.37579 15.3754C10.4062 15.3754 11.2495 14.5321 11.2495 13.5017C11.2495 12.4699 10.4062 11.6237 9.37579 11.6237L9.37721 11.6223ZM9.37721 12.3735C10.0023 12.3735 10.4998 12.8738 10.4998 13.5003C10.4998 14.1268 10.0037 14.6228 9.37721 14.6228C8.75074 14.6228 8.249 14.1268 8.249 13.5003C8.249 12.8738 8.75074 12.3735 9.37721 12.3735ZM5.62548 15.374C5.57431 15.3709 5.52304 15.3782 5.47482 15.3957C5.42661 15.4131 5.38246 15.4402 5.34512 15.4753C5.30777 15.5104 5.27801 15.5528 5.25766 15.5999C5.23732 15.6469 5.22682 15.6977 5.22682 15.7489C5.22682 15.8002 5.23732 15.8509 5.25766 15.898C5.27801 15.945 5.30777 15.9874 5.34512 16.0225C5.38246 16.0577 5.42661 16.0848 5.47482 16.1022C5.52304 16.1196 5.57431 16.127 5.62548 16.1238C5.7251 16.1238 5.82063 16.0842 5.89107 16.0138C5.96151 15.9434 6.00108 15.8478 6.00108 15.7482C6.00108 15.6486 5.96151 15.5531 5.89107 15.4826C5.82063 15.4122 5.7251 15.3726 5.62548 15.3726V15.374ZM11.251 16.498C11.1513 16.498 11.0558 16.5376 10.9854 16.608C10.9149 16.6784 10.8754 16.774 10.8754 16.8736C10.8754 16.9732 10.9149 17.0687 10.9854 17.1392C11.0558 17.2096 11.1513 17.2492 11.251 17.2492C11.3506 17.2492 11.4461 17.2096 11.5165 17.1392C11.587 17.0687 11.6265 16.9732 11.6265 16.8736C11.6265 16.774 11.587 16.6784 11.5165 16.608C11.4461 16.5376 11.3506 16.498 11.251 16.498ZM6.74944 18.3746C7.67781 18.3746 8.44034 19.045 8.592 19.9336L5.18894 21.273C5.00303 20.9914 4.89691 20.6646 4.88185 20.3274C4.86679 19.9902 4.94335 19.6553 5.10341 19.3582C5.26346 19.061 5.50102 18.8128 5.79085 18.6399C6.08068 18.4669 6.41194 18.3757 6.74944 18.376V18.3746Z" fill="currentColor"/>
    </svg>
  );
};

export default FoodPizza;