import React, {useState, useEffect, useContext} from "react";
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
        nicheDepth,
        scalingFactor, setScalingFactor,
        totalNicheDepth, setTotalNicheDepth
    } = useContext(ConfigurationContext);

    // Measurement adjustment stored here for css
    const [screenHeight, setScreenHeight] = useState('auto');
    const [screenWidth, setScreenWidth] = useState('auto');
    const [floorHeight, setFloorHeight] = useState('auto');
    const [pushScreen, setPushScreen] = useState('auto');

    // Adjust the scalingFactor context
    const adjustScale = () => {
            // Scale the image for visibility depending on the dimensions of the screen
            if(screen?.['Height'] > 200 || screen?.["Width"] > 200)
                setScalingFactor(.8);
            else if(screen?.['Height'] > 95 || screen?.["Width"] > 95)
                setScalingFactor(5);
            else if(screen?.['Height'] < 10 || screen?.["Width"] < 10)
                setScalingFactor(10);
            else setScalingFactor(6);
    }

    // Calculate the combined niche depth without the screen's size
    const calculateNicheDepth = () => {
        const screenDepth = Number(screen?.["Depth"]) || 0;
        const mediaPlayerDepth = Number(mediaPlayer?.["Depth"]) || 0;
        const mountDepth = Number(mount?.["Depth (in)"]) || 0;
        const nicheDepthValue = Number(nicheDepth) || 0;

        // console.log("Screen Depth:", screenDepth);
        // console.log("Media Player Depth:", mediaPlayerDepth);
        // console.log("Mount Depth:", mountDepth);
        // console.log("Niche Depth:", nicheDepthValue);

        const totalDepth = screenDepth + Math.max(mediaPlayerDepth, mountDepth) + nicheDepthValue;
        // console.log("Total Niche Depth:", totalDepth);

        setTotalNicheDepth(totalDepth);
    }


    // IMPORTANT: Must include duplicate functions in both useEffect hooks
    useEffect(() => {
        if(screen?.['Height'] && screen?.['Width']) {
            adjustScale();
            calculateNicheDepth();
            setScreenHeight(`${screen['Height'] * scalingFactor}px`);
            setScreenWidth(`${screen['Width'] * scalingFactor}px`);

            // When screen changes, adjust height, width, and scale the min height from floor to center.
            // Note that the floorHeight and pushScreen does not have a px addendum at the end
            setFloorHeight(`${(minDistanceFloor + (totalNicheDepth/4)) * scalingFactor}`);
            setPushScreen(`${(distanceFloor + (totalNicheDepth/4)) * scalingFactor}`);
        } else setScreenHeight('auto');
    }, [screen]);

    
    useEffect(() => {
        adjustScale();
        calculateNicheDepth();
        setScreenHeight(`${screen['Height'] * scalingFactor}px`);
        setScreenWidth(`${screen['Width'] * scalingFactor}px`);

        // Line to measure floor height must change when user changes niche depth
        // Screen gets pushed by the niche-display container as totalNicheDepth increases through inline styling
        setFloorHeight(`${(distanceFloor + (totalNicheDepth/4)) * scalingFactor}`);
        setPushScreen(`${(distanceFloor - minDistanceFloor) * scalingFactor }`);
    }, [distanceFloor, nicheDepth, mount, mediaPlayer]);
    

    // NOTE: inline-style calculations done at:
    // floor-distance-label, niche-display, niche-depth-label, receptacle-niche
    return(
        <div ref={pdfContainerRef} className="pdf-container" style={{
            borderBottom: "1px solid black",
            margin: ".5em",
        }}>
            <div className="floor-screen-container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 3fr",
                gridTemplateRows: "1fr auto",
                height: "100%",
            }}>
                <div className="specification-position" style={{
                    gridColumn: "1",
                    gridRow: "1",
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <DescriptionDisplay/>
                    <SpecificationDisplay/>
                </div>
                <div className="floor-distance-container" style={{
                    gridColumn: "2",
                    gridRow: "1",
                    alignSelf: "end",
                    marginLeft: "6em",
                }}>
                    {/* Add 1/4 the nicheDepth to adjust the new height from floor to center*/}
                    <label className="floor-distance-label" style={{paddingRight: "10em"}}>
                        {(distanceFloor + (totalNicheDepth/4)).toFixed(2)} (in)</label>
                    <div className="floor-distance" style={{
                        borderLeft: "1px solid red",
                        // borderTop: "1px solid red",
                        height: `${floorHeight}px`,
                    }}/>
                </div>
                <div className="niche-display" style={{
                    gridRow: "1",
                    gridColumn: "3",
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
                    }}><p>Niche: { (totalNicheDepth / 4).toFixed(2)} (in)</p></label> : ""}
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
                            backgroundColor: "red"
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
                            backgroundColor: "red"
                        }}>
                            <label className="screen-width-label" style={{
                                    position: "absolute",
                                    display: "flex",
                                    transform: "translateX(-60%) translateY(-250%)",
                                }}>
                                    <p>Width: {orientation == "horizontal" ? screen?.["Width"] : screen?.["Height"]} (in)</p>
                            </label>
                        </div>
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
            <br/>
            <label style={{
                position: "absolute",
                transform: 'translateY(0%) translateX(50%)',
            }}>Floor</label>
        </div>   
    )
}

export default DiagramDisplay;