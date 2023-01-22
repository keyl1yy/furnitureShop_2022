import CODImg from "../public/icon/COD.svg";
import MoMoImg from '../public/img/momo-icon.png';
import ZaloPayImg from '../public/icon/logo-zalopay.svg'
import ShopeePayImg from '../public/img/shopeePay.png'
import VnPayImg from '../public/img/vnpay.webp'
export const paymentList = [
    {
        value: 'cod',
        label: 'COD',
        subTitle: 'Thanh toán khi nhận hàng',
        imgUrl: CODImg
    },
    // {
    //     value: 'momo',
    //     label: 'Thanh toán MoMo',
    //     subTitle: undefined,
    //     imgUrl: MoMoImg
    // },
    // {
    //     value: 'zaloPay',
    //     label: 'Ví điện tử ZaloPay',
    //     subTitle: undefined,
    //     imgUrl: ZaloPayImg
    // },
    // {
    //     value: 'shopeePay',
    //     label: 'Ví shopeePay',
    //     subTitle: 'Giảm thêm 50k cho khách hàng lần đầu mở ví và thanh toán bằng ShopeePay',
    //     imgUrl: ShopeePayImg
    // },
    {
        value: 'vnPay',
        label: 'VnPay',
        subTitle: 'Mobile banking của các ngân hàng qua VNPAY',
        imgUrl: VnPayImg
    }
]