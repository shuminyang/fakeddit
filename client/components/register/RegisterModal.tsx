import { useState } from "react"
import Modal from '@material-ui/core/Modal'
import { makeStyles, Theme, createStyles } from "@material-ui/core"
import RegisterForm from "./Form";

interface IRegister {
  isOpen: boolean
  handleClose: () => void
}

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "&:focus": {
        outline: "none",
      }
    },
  }),
);

const RegisterModal = ({ isOpen, handleClose }: IRegister) => {
  const { paper } = useStyles()
  const [modalStyle] = useState(getModalStyle);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div style={modalStyle} className={paper}>
        <RegisterForm />
      </div>
    </Modal>
  )
}

export default RegisterModal