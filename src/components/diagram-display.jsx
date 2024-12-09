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
        nicheDepth,
        scalingFactor, setScalingFactor
    } = useContext(ConfigurationContext);

    // Measurement adjustment stored here for css
    const [screenHeight, setScreenHeight] = useState('auto');
    const [screenWidth, setScreenWidth] = useState('auto');
    const [floorHeight, setFloorHeight] = useState('auto');
    const [pushScreen, setPushScreen] = useState('auto');

    // Adjust the scalingFactor context
    const adjustScale = () => {
            // If the screen height/width is over 200 inches, scale down.
            // If the screen height/width is over 100 inches, scale down
            // If the sceen is below 100 inches, scale the image up for visibility.
            if(screen?.['Height'] > 200 || screen?.["Width"] > 200)
                setScalingFactor(.8);
            else if(screen?.['Height'] > 100 || screen?.["Width"] > 100)
                setScalingFactor(2);
            else
                setScalingFactor(6);
    }

    // When screen changes, adjust height, width, and scale the min height from floor to center.
    // Note that the floorHeight does not have a px addendum at the end
    useEffect(() => {
        if(screen?.['Height'] && screen?.['Width']) {
            adjustScale();
            setScreenHeight(`${screen['Height'] * scalingFactor}px`);
            setScreenWidth(`${screen['Width'] * scalingFactor}px`);
            setFloorHeight(`${(minDistanceFloor + (nicheDepth/4)) * scalingFactor}`);
            setPushScreen(`${(distanceFloor + (nicheDepth/4)) * scalingFactor}`);
        } else setScreenHeight('auto');
    }, [screen]);

    // Line to measure floor height must change with nicheDepth
    // Screen gets pushed by the niche-display container as nicheDepth increases through inline styling
    useEffect(() => {
        adjustScale();
        setScreenHeight(`${screen['Height'] * scalingFactor}px`);
        setScreenWidth(`${screen['Width'] * scalingFactor}px`);
        setFloorHeight(`${(distanceFloor + (nicheDepth/4)) * scalingFactor}`);
        setPushScreen(`${(distanceFloor - minDistanceFloor) * scalingFactor }`);
    }, [distanceFloor, nicheDepth]);
    
    return(
        <div className="pdf-container" style={{
            borderBottom: "1px solid black",
            margin: "1em",
        }}>
            <div className="floor-screen-container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "1fr auto",
                height: "100%",
            }}>
                <div className="floor-distance-container" style={{
                    gridColumn: "1 / -1",
                    gridRow: "1",
                    alignSelf: "end",
                    marginLeft: "20px",
                }}>
                    {/* Add 1/4 the nicheDepth to adjust the new height from floor to center*/}
                    <label style={{padding: "5px"}}>{(distanceFloor + (nicheDepth/4)).toFixed(2)} (in)</label>
                    <div className="floor-distance" style={{
                        borderLeft: "1px solid red",
                        borderTop: "1px solid red",
                        height: `${floorHeight}px`,
                    }}/>
                </div>
                {/* RECEPTACLE BOX ABOVE THE NICHE*/}
                {/* <div className="floor" style={{
                    borderTop: "1px solid black",
                    height: "50px",
                    width: "100%",
                    flexShrink: "0",
                    gridColumn: "1 / 3",
                    gridRow: "2",
                }}/> */}
                <div className="niche-display" style={{
                    gridRow: "1",
                    gridColumn: "2 / 3",
                    alignSelf: "end",
                    marginRight: "1em",
                    marginBottom: `${pushScreen}px`,
                    border: "1px solid black",
                    padding: `${(nicheDepth / 4) * scalingFactor}px`,
                    width: "fit-content"
                }}>
                    {nicheDepth > 0 ? <label className="niche-depth-label" style={{
                        position: "absolute",
                        display: "flex",
                        transform: "translateX(-110%) translateY(-60%)",
                    }}><p>Niche: </p>{ (nicheDepth / 4).toFixed(2)} (in)</label> : ""}
                    <div className="diagram-display" style={{
                        border: "4px solid black",
                        height: `${orientation == "horizontal" ? screenHeight : screenWidth}`,
                        width: `${orientation == "horizontal" ? screenWidth : screenHeight}`,
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        gridTemplateRows: "1fr auto 1fr"
                    }}>
                        <div className="screen-center-horizontal" style={{
                            gridColumn: "1 / -1",
                            gridRow: "2",
                            height: "1px",
                            width: "100%",
                            backgroundColor: "red"
                        }}>
                            <label className="screen-height-label" style={{
                                position: "absolute",
                                display: "flex",
                                transform: "translateX(-120%) translateY(-50%)",
                            }}>
                                <p>Height: {orientation == "horizontal" ? screen?.["Height"] : screen?.["Width"]} (in)</p>
                            </label>
                        </div>
                        <div className="screen-center-vertical" style={{
                            gridColumn: "2",
                            gridRow: "1/-1",
                            height: "100%",
                            width: "1px",
                            backgroundColor: "red"
                        }}>
                            <label className="screen-width-label" style={{
                                    position: "absolute",
                                    display: "flex",
                                    transform: "translateX(-60%) translateY(-160%)",
                                }}>
                                    <p>Width: {orientation == "horizontal" ? screen?.["Width"] : screen?.["Height"]} (in)</p>
                            </label>
                        </div>
                        <div className="power-outlet" style={{
                            position: "absolute",
                            width: "50px",
                            height: "50px",
                            border: "1px dashed black",
                            alignSelf: "center",
                            justifySelf: "center"
                        }}/>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default DiagramDisplay;