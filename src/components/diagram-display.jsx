import React, {useState, useEffect, useContext, useRef } from "react";
import { ConfigurationContext } from "../contexts/configuration-context";
import { EquipmentContext } from "../contexts/equipment-context";
import DimensionsDescriptionDisplay from "./dimensions-description-display";

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

    // Center of the screen container (not the screen itself)
    const screenCenterRef = useRef(null);

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

    useEffect(() => {
        if(screen?.['Height'] && screen?.['Width']) {
            adjustScale();
            calculateNicheDepth();

            if(orientation === "horizontal") {
                setScreenHeight(`${screen['Height'] * scalingFactor}`);
                setScreenWidth(`${screen['Width'] * scalingFactor}`);
            } else {
                setScreenHeight(`${screen['Width'] * scalingFactor}`);
                setScreenWidth(`${screen['Height'] * scalingFactor}`);
            }
            
        } else setScreenHeight('auto');
    }, [screen, distanceFloor, niche, nicheDepth, mount, mediaPlayer]);

    // NOTE: inline-style calculations done at:
    // floor-distance-label, floor-distance, niche-display, niche-depth-label, receptacle-niche
    return(
        <div ref={pdfContainerRef} className="pdf-container">
            <div className="floor-screen-container" style={{
                display: "grid",
                gridTemplateColumns: "60% 40%",
                height: "100%",
            }}>
                <div className="specification-position" style={{
                    gridColumn: "2",
                    gridRow: "1/2",
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <DimensionsDescriptionDisplay/>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <svg width={screenWidth || "100%"} height={"100%"} viewBox={`0 0 ${screenWidth || "100%"} ${screenHeight || "100%"}`} xmlns="http://www.w3.org/2000/">
                        {/* Screen */}
                        <rect
                            x="0"
                            y="0" 
                            width={screenWidth || "100%"} 
                            height={screenHeight || "100%"} 
                            stroke="black" 
                            fill="none" 
                            strokeWidth={2}/>
                        {/* Floor */}
                        <line x1="0" 
                            y1="200%" 
                            x2={screenWidth} 
                            y2="200%" 
                            stroke="black" 
                            strokeWidth={2}/>
                        {/* Floor label */}
                        {/* Floor line */}
                        <line x1={screenWidth / 2} 
                            y1="200%" 
                            x2={screenWidth / 2} 
                            y2={`calc(100% - ${screenHeight / 2}px)`} 
                            stroke="black" 
                            strokeWidth={2}/>
                        {/* Floor line label */}
                        <text 
                            x={screenWidth / 2 + 50} 
                            y="150%" 
                            textAnchor="middle" 
                            fill="black">{(distanceFloor + (totalNicheDepth/4)).toFixed(2)}"</text>
                    </svg>
                </div>

                {/* <div className="diagram-container" style={{
                    border: "1px solid black",
                    height: "100%"
                }}>
                    <div className="floor-container" style={{
                        margin: "2em",
                        borderBottom: "1px solid black",
                        height: "calc(100% - 6em)",
                        boxSizing: "border-box",
                        display: "grid",
                        gridTemplateColumns: "6em 1fr",
                        gridTemplateRows: "1fr"
                    }}>
                        <div className="floor-distance-container" style={{
                            gridColumn: "1",
                            alignSelf: "end",
                            marginLeft: "6em",
                            }}>
                                <div className="floor-distance-label" style={{paddingRight: "10em"}}>
                                    {(distanceFloor + (totalNicheDepth/4)).toFixed(2)}</div>
                                <div className="floor-distance" style={{
                                    borderLeft: "1px solid black",
                                    height: `${(distanceFloor + (totalNicheDepth/4)) * scalingFactor}px`,
                                }}/>
                                <div style={{
                                    position: "absolute",
                                }}>
                                    Floor Line
                                </div>
                        </div>
                        <div className="screen-boundaries-container" style={{
                            gridColumn: "2",
                            margin: "2em",
                            border: "1px solid black",
                            height: "calc(100% - 10em)",
                            boxSizing: "border-box",
                            display: "display",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div className="niche-height-label" style={{
                                    gridRow: "2",
                                    gridColumn: "1",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingRight: `${(totalNicheDepth / 4) * scalingFactor}px`,
                                    alignItems: "center",
                                    borderLeft: "1px solid black",
                                    height: `${orientation == "horizontal" ? screenHeight : screenWidth}`,
                            }}> 
                                <p style={{
                                    transform: "translateX(30%)"
                                }}>{orientation == "horizontal" ? screen?.["Height"] : screen?.["Width"]}"</p>
                            </div>
                            <div className="niche-display" style={{
                                gridRow: "2",
                                gridColumn: "2",
                                alignSelf: "center",
                                justifySelf: "center",
                                marginRight: "1em",
                                border: "1px solid black",
                                padding: `${(totalNicheDepth / 4) * scalingFactor}px`,
                                width: "fit-content"
                            }}>
                            </div>
                            <div className="screen-height-label" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: `${(totalNicheDepth / 4) * scalingFactor}px`,
                                    alignItems: "center",
                                    borderLeft: "1px solid black",
                                    height: `${orientation == "horizontal" ? screenHeight : screenWidth}`,
                                }}><p style={{
                                    transform: "translateX(30%)"
                                }}>{orientation == "horizontal" ? screen?.["Height"] : screen?.["Width"]}"</p>
                            </div>
                            <div className="screen-width-label" style={{
                                position: "absolute",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                width: `${orientation == "horizontal" ? screenWidth : screenHeight}`,
                                transform: `translateY(${orientation == "horizontal" ? -200 + (-(totalNicheDepth) * scalingFactor) 
                                    : -250 - totalNicheDepth/4 * scalingFactor}%) translateX(0%)`,
                            }}>
                                <p style={{
                                    transform: "translateX(30%)"
                                }}>{orientation == "horizontal" ? screen?.["Width"] : screen?.["Height"]}"</p>
                            </div>
                            {totalNicheDepth > 0 ? <div className="niche-depth-label" style={{
                                position: "absolute",
                                display: "flex",
                                transform: "translateX(-130%) translateY(-60%)",
                            }}><p>Niche: { (totalNicheDepth/4).toFixed(2)} (in)</p></div> : ""}
                            <div className="diagram-display" style={{
                                border: "2px solid black",
                                height: `${orientation == "horizontal" ? screenHeight : screenWidth}`,
                                width: `${orientation == "horizontal" ? screenWidth : screenHeight}`,
                                display: "grid",
                                gridTemplateColumns: "1fr auto 1fr",
                                gridTemplateRows: "1fr auto 1fr"
                            }}>
                                <div className="screen-center-horizontal" ref={screenCenterRef} style={{
                                    gridColumn: "1 / -1",
                                    gridRow: "2",
                                    height: "1px",
                                    width: "100%",
                                    backgroundColor: "black"
                                }}/>
                                <div className="screen-center-vertical" style={{
                                    gridColumn: "2",
                                    gridRow: "1/-1",
                                    height: "100%",
                                    width: "1px",
                                    backgroundColor: "black"
                                }}/>
                                {mount ? <div className="mount" style={{
                                    position: "absolute",
                                    border: "1px solid blue",
                                    alignSelf: "center",
                                    justifySelf: "center",
                                    width: `${mount["Width (in)"] * scalingFactor}px`,
                                    height: `${mount["Height (in)"] * scalingFactor}px`,
                                    zIndex: "-1"
                                }}/> : ""}
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
                </div> */}
            </div>
        </div>   
    )
}

export default DiagramDisplay;