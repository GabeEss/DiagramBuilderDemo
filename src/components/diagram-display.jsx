import React, {useState, useEffect, useContext} from "react";
import { ConfigurationContext } from "../contexts/configuration-context";
import { EquipmentContext } from "../contexts/equipment-context";

function DiagramDisplay() {
    const {
        screen,
        mount,
        mediaPlayer,
        receptacle
    } = useContext(EquipmentContext);

    const {
        orientation,
        distanceFloor,
        minDistanceFloor,
        nicheDepth
    } = useContext(ConfigurationContext);

    // Measurement adjustment stored here for css
    const [screenHeight, setScreenHeight] = useState('auto');
    const [screenWidth, setScreenWidth] = useState('auto');
    const [floorHeight, setFloorHeight] = useState('auto');
    const [pushScreen, setPushScreen] = useState('auto');

    // Scale to make diagram visible
    const SCALING_FACTOR = 8;

    // When screen changes, adjust height, width, and scale the min height from floor to center.
    // Note that the floorHeight does not have a px addendum at the end
    useEffect(() => {
        if(screen?.['Height'] && screen?.['Width']) {
            setScreenHeight(`${screen['Height'] * SCALING_FACTOR}px`);
            setScreenWidth(`${screen['Width'] * SCALING_FACTOR}px`);
            setFloorHeight(`${minDistanceFloor * SCALING_FACTOR}`);
            setPushScreen(`${distanceFloor * SCALING_FACTOR}`);
        } else setScreenHeight('auto');
    }, [screen]);

    useEffect(() => {
        setFloorHeight(`${distanceFloor * SCALING_FACTOR}`);
        setPushScreen(`${(distanceFloor - minDistanceFloor) * SCALING_FACTOR }`);
    }, [distanceFloor])
    
    return(
        <div className="pdf-container" style={{
            border: "1px solid black",
            margin: "1em",
        }}>
            <div className="floor-screen-container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "1fr auto",
                height: "100%",
            }}>
                <div style={{
                    gridColumn: "1 / -1",
                    gridRow: "1",
                    alignSelf: "end",
                    marginLeft: "20px",
                }}>
                    <label style={{padding: "5px"}}>{distanceFloor} (in)</label>
                    <div className="floor-distance" style={{
                        borderLeft: "1px solid red",
                        height: `${floorHeight}px`,
                    }}/>
                </div>
                <div className="floor" style={{
                    borderTop: "1px solid black",
                    height: "50px",
                    width: "100%",
                    flexShrink: "0",
                    gridColumn: "1 / 3",
                    gridRow: "2",
                }}/>
                <div className="niche-display" style={{
                    gridRow: "1",
                    gridColumn: "2 / 3",
                    alignSelf: "end",
                    marginRight: "1em",
                    marginBottom: `${pushScreen}px`
                }}>
                    <div className="diagram-display" style={{
                        border: "4px solid black",
                        height: screenHeight,
                        width: screenWidth,
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        gridTemplateRows: "1fr auto 1fr"
                    }}>
                        <div className="screen-center=horizontal" style={{
                            gridColumn: "1 / -1",
                            gridRow: "2",
                            height: "1px",
                            width: "100%",
                            backgroundColor: "red"
                        }}/>
                        <div className="screen-center-vertical" style={{
                            gridColumn: "2",
                            gridRow: "1/-1",
                            height: "100%",
                            width: "1px",
                            backgroundColor: "red"
                        }}/>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default DiagramDisplay;