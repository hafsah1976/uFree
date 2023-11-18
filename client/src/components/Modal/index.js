import ReactModal from "react-modal";

import './Modal.css';

export default function Modal({ isOpen, onRequestClose, modalBody, modalFooter }) {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} appElement={document.querySelector('.App')} style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                },
                content: {
                    whiteSpace: 'pre-line',
                    border: 'none',
                    borderRadius: 'var(--large-border-radius)',
                    width: 'max-content',
                    maxWidth: '60vw',
                    height: 'fit-content',
                    padding: '30px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }
            }}>
                <i className="modal_x bi bi-x" onClick={onRequestClose}></i>
                
                <div className='modal_body'>
                    {modalBody}
                </div>

                <div className='modal_footer'>
                    {modalFooter}
                </div>
        </ReactModal>
    );
}
