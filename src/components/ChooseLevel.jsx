const ChooseLevel = ({getQuestions}) => {
    return (
        <>
            <div className='level-container'>
                <h2>Choose a level</h2>
                <ul className='level-list-container'>
                    <li className='level-item' onClick={() => getQuestions('easy')}>Easy</li>
                    <li className='level-item' onClick={() => getQuestions('medium')}>Medium</li>
                    <li className='level-item' onClick={() => getQuestions('hard')}>Hard</li>
                </ul>
            </div>
        </>
    )
}

export default ChooseLevel