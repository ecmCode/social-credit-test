const Sidebar = ({classname, socialCredit, restart, picture,gameComplete}) => {
    return( 
        <div className={classname}>
          {!gameComplete && <h2>Social Credit score: {socialCredit}</h2>}
          <button onClick={() => restart()}>Restart</button>
          <img src={picture} />
        </div>
    )
}

export default Sidebar;
