import React from 'react'

function Test() {


    const [show, setShow] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // return (
    //     <>
    //       <Button variant="primary" onClick={handleShow}>
    //         Launch demo modal
    //       </Button>
    
    //       <Modal show={show} onHide={handleClose}>
    //         <Modal.Header closeButton>
    //           <Modal.Title>Modal heading</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //         <Modal.Footer>
    //           <Button variant="secondary" onClick={handleClose}>
    //             Close
    //           </Button>
    //           <Button variant="primary" onClick={handleClose}>
    //             Save Changes
    //           </Button>
    //         </Modal.Footer>
    //       </Modal>
    //     </>
    //   )
  
}

export default Test