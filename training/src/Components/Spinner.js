import React from 'react'
import { Button } from 'react-bootstrap'

const Spinner = () => {
  return (
    <Button className="btn btn-sm text-white  web_button_width web_button justify-content-center d-flex">
    <div class="spinner-border " style={{height:"23px",width:"23px"}} role="status">
  </div>
  </Button>
  )
}

export default Spinner