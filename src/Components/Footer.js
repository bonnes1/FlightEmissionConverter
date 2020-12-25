import React from 'react';
import report from '../Resources/Report.pdf'

const Footer = () => {
    const style = {textDecorationLine:'underline',textAlign:'center',font:'8px'};
    return(
        <div className={'Footer'}>
            <div>This flight emission converter was developed by Hannes Bennet, Paulina Knobloch and Beatrice Walerud within
                an Advanced Project course 2020 at KTH Royal Institute of Technology. If you want to know more about the
                project, see our <a style={style} href={report}> report.</a> </div>

        </div>)
};
export default Footer;
