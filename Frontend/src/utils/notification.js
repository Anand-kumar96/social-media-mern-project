import { toast } from 'react-toastify'

const successNotification = (message, x) => {
  toast.success(message, {
    position: x ? 'top-center' : 'top-right',
    autoClose: 5000,
  })
}
const errorNotification = (error, err, x) => {
  toast.error(error || err, {
    position: x ? 'top-center' : 'top-right',
    autoClose: 5000,
  })
}
export { successNotification, errorNotification }
