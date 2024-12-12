import React, {useState, useEffect, useContext } from "react";
import { ConfigurationContext } from "../contexts/configuration-context";
import { EquipmentContext } from "../contexts/equipment-context";
import DescriptionDisplay from "./description-display";
import SpecificationDisplay from "./specification-display";

function DiagramDisplay({pdfContainerRef}) {
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
        niche, setNiche,
        nicheDepth, setNicheDepth,
        scalingFactor, setScalingFactor,
        totalNicheDepth, setTotalNicheDepth
    } = useContext(ConfigurationContext);

    // Measurement adjustment stored here for css
    const [screenHeight, setScreenHeight] = useState('auto');
    const [screenWidth, setScreenWidth] = useState('auto');

    // State to push the screen when user increases the floor distance
    const [pushScreen, setPushScreen] = useState('auto');

    // Adjust the scalingFactor context
    const adjustScale = () => {
        // Get the max dimension of the current screen
        const maxDimension = Math.max(screen?.["Width"], screen?.["Height"]);

        // Dynamically scale inversely to max dimension
        const dynamicScalingFactor = 300 / maxDimension;
        setScalingFactor(dynamicScalingFactor);
    }

    // Calculate the combined niche depth without the screen's size
    const calculateNicheDepth = () => {
        if(niche === "flat") {
            setNicheDepth(0);
            setTotalNicheDepth(0);
            return;
        }
        
        const screenDepth = Number(screen?.["Depth"]) || 0;
        const mediaPlayerDepth = Number(mediaPlayer?.["Depth"]) || 0;
        const mountDepth = Number(mount?.["Depth (in)"]) || 0;
        const nicheDepthValue = Number(nicheDepth) || 0;

        // totalNicheDepth needs the full value to start, so multiply variant niche depth by 4
        const totalDepth = screenDepth + Math.max(mediaPlayerDepth, mountDepth) + (nicheDepthValue * 4);

        setTotalNicheDepth(totalDepth);
    }

    // IMPORTANT: Must include duplicate functions in both useEffect hooks
    useEffect(() => {
        if(screen?.['Height'] && screen?.['Width']) {
            adjustScale();
            calculateNicheDepth();

            setScreenHeight(`${screen['Height'] * scalingFactor}px`);
            setScreenWidth(`${screen['Width'] * scalingFactor}px`);

            // Note that the pushScreen does not have a px addendum at the end
            setPushScreen(`${(distanceFloor + (totalNicheDepth/4)) * scalingFactor}`);
        } else setScreenHeight('auto');
    }, [screen]);

    
    useEffect(() => {
        adjustScale();
        calculateNicheDepth();

        setScreenHeight(`${screen['Height'] * scalingFactor}px`);
        setScreenWidth(`${screen['Width'] * scalingFactor}px`);

        setPushScreen(`${(distanceFloor - minDistanceFloor) * scalingFactor }`);
    }, [distanceFloor, niche, nicheDepth, mount, mediaPlayer]);

    // NOTE: inline-style calculations done at:
    // floor-distance-label, floor-distance, niche-display, niche-depth-label, receptacle-niche
    return(
        <div ref={pdfContainerRef} className="pdf-container" style={{
            borderBottom: "1px solid black",
            margin: ".5em",
        }}>
            <div className="floor-screen-container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr auto",
                height: "100%",
            }}>
                <div className="specification-position" style={{
                    gridColumn: "3",
                    gridRow: "1",
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <SpecificationDisplay/>
                    <DescriptionDisplay/>
                </div>
                <div className="floor-distance-container" style={{
                    gridColumn: "1",
                    gridRow: "1",
                    alignSelf: "end",
                    marginLeft: "6em",
                }}>
                    {/* Add 1/4 the nicheDepth to adjust the new height from floor to center*/}
                    <label className="floor-distance-label" style={{paddingRight: "10em"}}>
                        {(distanceFloor + (totalNicheDepth/4)).toFixed(2)} (in)</label>
                    <div className="floor-distance" style={{
                        borderLeft: "1px solid black",
                        // borderTop: "1px solid black",
                        height: `${(distanceFloor + (totalNicheDepth/4)) * scalingFactor}px`,
                    }}/>
                </div>
                <div className="niche-display" style={{
                    gridRow: "1",
                    gridColumn: "2",
                    alignSelf: "end",
                    marginRight: "1em",
                    marginBottom: `${pushScreen}px`,
                    border: "1px solid black",
                    padding: `${(totalNicheDepth / 4) * scalingFactor}px`,
                    width: "fit-content"
                }}>
                    {totalNicheDepth > 0 ? <label className="niche-depth-label" style={{
                        position: "absolute",
                        display: "flex",
                        transform: "translateX(-130%) translateY(-60%)",
                    }}><p>Niche: { (totalNicheDepth/4).toFixed(2)} (in)</p></label> : ""}
                    <div className="diagram-display" style={{
                        border: "2px solid black",
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
                            backgroundColor: "black"
                        }}>
                            <label className="screen-height-label" style={{
                                position: "absolute",
                                display: "flex",
                                transform: "translateX(-130%) translateY(-50%)",
                            }}>
                                <p>Height: {orientation == "horizontal" ? screen?.["Height"] : screen?.["Width"]} (in)</p>
                            </label>
                        </div>
                        <div className="screen-center-vertical" style={{
                            gridColumn: "2",
                            gridRow: "1/-1",
                            height: "100%",
                            width: "1px",
                            backgroundColor: "black"
                        }}>
                            <label className="screen-width-label" style={{
                                    position: "absolute",
                                    display: "flex",
                                    transform: "translateX(-60%) translateY(-250%)",
                                }}>
                                    <p>Width: {orientation == "horizontal" ? screen?.["Width"] : screen?.["Height"]} (in)</p>
                            </label>
                        </div>
                        {/* {mount ? <div className="mount" style={{
                            position: "absolute",
                            border: "1px solid blue",
                            alignSelf: "center",
                            justifySelf: "center",
                            width: `${mount["Width (in)"] * scalingFactor}px`,
                            height: `${mount["Height (in)"] * scalingFactor}px`,
                            zIndex: "-1"
                        }}/> : ""} */}
                        <div className="receptacle-niche" style={{
                            position: "absolute",
                            border: "1px dashed black",
                            alignSelf: "center",
                            justifySelf: "center",
                            padding: `${(receptacle["Depth (in)"] / 4) * scalingFactor}px`
                        }}>
                            <div className="receptacle" style={{
                                border: "1px dashed black",
                                width: `${receptacle["Width (in)"] * scalingFactor}px`,
                                height: `${receptacle["Height (in)"] * scalingFactor}px`,
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <label style={{
                position: "absolute",
                transform: 'translateY(0%) translateX(50%)',
            }}>Floor</label>
        </div>   
    )
}

export default DiagramDisplay;