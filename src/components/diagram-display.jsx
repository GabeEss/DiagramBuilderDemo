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

    // Adjusts the SVG dimensions beyond the dimensions of the niche + screen
    const SVG_ADJUST = 250;

    // Adjusts the position of the floor line along the x axis
    const FLOOR_LINE_X = 80;

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


    // IMPORTANT: Calculations must be done inline.
    return(
        <div ref={pdfContainerRef} className="pdf-container">
            <div className="diagram-description-container" style={{
                display: "grid",
                gridTemplateColumns: "60% 40%",
                height: "100%",
            }}>
                {/* Position for the description of the project and dimension displays. */}
                <div className="description-position" style={{
                    gridColumn: "2",
                    gridRow: "1/2",
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <DimensionsDescriptionDisplay/>
                </div>
                <div className="svg-container" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "2em",
                }}>
                    <svg
                        width={(Number(screenWidth) + totalNicheDepth/2 * scalingFactor) + SVG_ADJUST || "100%"}
                        height={"100%"}
                        viewBox={`0 0 ${((totalNicheDepth/2 * scalingFactor) + Number(screenWidth) + SVG_ADJUST) || "100%"} 
                        ${(((totalNicheDepth/2 * scalingFactor) + Number(screenHeight) + SVG_ADJUST)) || "100%"}`} 
                        xmlns="http://www.w3.org/2000/">
                        {/* Niche Rectangle */}
                        <rect
                            x={SVG_ADJUST/2}
                            y={SVG_ADJUST/2}
                            height={(Number(screenHeight) + totalNicheDepth/2 * scalingFactor)}
                            width={(Number(screenWidth) + totalNicheDepth/2 * scalingFactor)}
                            stroke="black"
                            fill="none"
                            strokeWidth={2}
                        />
                        {/* Screen Rectangle */}
                        <rect
                            x={`${((Number(screenWidth) + totalNicheDepth/2 * scalingFactor) - Number(screenWidth)) / 2 + SVG_ADJUST/2}`}
                            y={`${((Number(screenHeight) + totalNicheDepth/2 * scalingFactor) - Number(screenHeight)) / 2 + SVG_ADJUST/2}`}
                            width={screenWidth}
                            height={screenHeight}
                            stroke="black" 
                            fill="none" 
                            strokeWidth={2}/>
                        {/* Receptacle Rectangle */}
                        <rect
                            x={((Number(screenWidth) + totalNicheDepth/2 * scalingFactor) - receptacle["Width (in)"] * scalingFactor) / 2 + SVG_ADJUST/2}
                            y={((Number(screenHeight) + totalNicheDepth/2 * scalingFactor) - receptacle["Height (in)"] * scalingFactor) / 2 + SVG_ADJUST/2}
                            width={`${receptacle["Width (in)"] * scalingFactor}`}
                            height={`${receptacle["Height (in)"] * scalingFactor}`}
                            stroke="black"
                            fill="none"
                        />
                        {/* Floor */}
                        <line x1={FLOOR_LINE_X} 
                            y1={((Number(screenHeight) + totalNicheDepth/2 * scalingFactor) + SVG_ADJUST)}
                            x2={totalNicheDepth/2 * scalingFactor + Number(screenWidth) + SVG_ADJUST - FLOOR_LINE_X} 
                            y2={((Number(screenHeight) + totalNicheDepth/2 * scalingFactor) + SVG_ADJUST)}
                            stroke="black" 
                            strokeWidth={2}/>
                        {/* Floor line */}
                        <line x1={FLOOR_LINE_X}
                            y1={((Number(screenHeight) + totalNicheDepth/2 * scalingFactor) + SVG_ADJUST)}
                            x2={FLOOR_LINE_X}
                            y2={((totalNicheDepth/2 * scalingFactor + Number(screenHeight))/2 + SVG_ADJUST/2)}
                            stroke="black" 
                            strokeWidth={2}/>
                        {/* Floor line measurement label */}
                        <text 
                            x={FLOOR_LINE_X - 30} 
                            y={((totalNicheDepth/2 * scalingFactor + Number(screenHeight)))/2 + SVG_ADJUST/2}
                            textAnchor="middle"
                            fontSize={14} 
                            fill="black">{(distanceFloor + (totalNicheDepth/4)).toFixed(2)}"</text>
                        {/* Center line label */}
                        <text 
                            x={FLOOR_LINE_X - 30} 
                            y={((totalNicheDepth/2 * scalingFactor + Number(screenHeight)))/2 + SVG_ADJUST/2 + 10}
                            textAnchor="middle"
                            fontSize={14}
                            fill="black">
                                <tspan x={FLOOR_LINE_X - 40} dy="1.2em">Center Line</tspan>
                                <tspan x={FLOOR_LINE_X - 40} dy="1.2em">of Screen</tspan>
                            </text>
                        {/* Floor line label */}
                        <text 
                            x={FLOOR_LINE_X - 40} 
                            y={((totalNicheDepth/2 * scalingFactor + Number(screenHeight))) + 200}
                            textAnchor="middle"
                            fontSize={14} 
                            fill="black">Floor Line
                            </text>
                    </svg>
                </div>
            </div>
        </div>   
    )
}

export default DiagramDisplay;