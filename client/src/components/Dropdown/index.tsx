
import {useState, useEffect} from "react"
import defaultStyles from './option.module.scss'
import {icon} from "../../asset/imgGetter"
import ModalOut from "../ModalOut/"

type optionProps = {
    option: {
        value: Array<string>,
        content: Array<string>
    },
    setSelected?: any,
    styles? : {
        readonly [key: string]: string;
    },
    caret?: string,
    className? : string
}

function Dropdown(props: optionProps) {
    const styles = {...defaultStyles, ...props.styles};
    const caret = props.caret || icon.carretDown;

    const [collapse, setCollapse] = useState(true);
    const [selectedId, setSelectedId] = useState(0);
    function handleSelectOpt(val:number){
        setSelectedId(val)
    }

    useEffect(() => {
        props.setSelected && props.setSelected(props.option?.value?.[selectedId]);
        setCollapse(true);
    }, [props, selectedId])

    return(
        <div className={"Option relative w-fit " + props.className}>
            {!collapse && <ModalOut onClick={()=>setCollapse(true)}/>}
            <div className={styles.container + " flex gap-4 justify-between"} onClick={()=>setCollapse(prev => !prev)}>
                <p className={styles.text}>{props.option?.content[selectedId]}</p>
                <img style={{maxWidth: "none"}} src={caret} alt="" />
            </div>
            {!collapse && <div className={styles.options}>
                {props.option?.value.map((val, i)=>{
                    return (
                        <div className={`${selectedId === i ? styles.selectedOpt : " "}
                        ${styles.option}`} key={i} {...{value: val}}
                             onClick={()=>handleSelectOpt(i)}
                        >{props.option?.content[i]}</div>
                    )
                })}
            </div>}
        </div>
    )

}

export default Dropdown;