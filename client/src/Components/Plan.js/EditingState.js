import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import Loader from '../UI/Loader'

const EditingState = ({editingValue, setEditingValue, exitEdit, update, loading, btnText}) => {
  return (
        <>
            <input type='text' value={editingValue} onChange={(e) => setEditingValue(e.target.value)}/>
            <button className='cancel-btn' onClick={() => exitEdit('cancel')}><LiaTimesSolid/></button>
            <button className="primary-btn" onClick={update}>
                {loading ? <Loader classProp='btn-loader'/> : btnText}
            </button>
        </>
  )
}

export default EditingState
