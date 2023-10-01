
const list = [
  'team1.sol',
  'loves.sol',
  'encode.sol',
  'autumn.sol',
  'solana.sol',
  'bootcamp.sol',
  '2023.sol'
]

const SNSList = ({handleSNSClick}) => {

  return (
    <div>

      {list.map((sns, i) => (
        <div className='radio-container' key={i}>
          <input type='radio' id={sns} value={sns} name='sns-list' onClick={handleSNSClick}/>
          <label htmlFor={sns}>
            {sns}
          </label>
        </div>
      ))}
  
    </div>
  )
}

export default SNSList