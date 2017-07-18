import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal} from 'react-modal'
import {
  newDuckTop, pointer,
  newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn
} from './Modal.css'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

export default function Modal(props) {

  function submitDuck() {
    console.log('Submitting duck');
  }

  return (
    <span className={darkBtn}
          onClick={props.openModal}>
      {'Duck'}
      <ReactModal style={modalStyles}
                  isOpen={props.isOpen}
                  onRequestClose={props.closeModal}
                  contentLabel="modal"
      >
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>
            {'X'}
          </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea value={props.duckText}
                    onChange={(e) => props.updateDuckText(e.target.value)}
                    maxLength={140}
                    type='text'
                    className={newDuckInput}
                    placeholder="What's on your mind?"/>
        </div>
        <button className={submitDuckBtn}
                disabled={props.isSubmitDisabled}
                onClick={submitDuck}>
          {'Duck'}
        </button>
      </ReactModal>
    </span>
  )
}

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired
}