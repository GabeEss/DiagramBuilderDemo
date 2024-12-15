# DRAW DIAGRAM

This project allows the user to make a diagram for a screen and download it as a pdf.

## Installation

# Clone the repo
git clone git@github.com:GabeEss/DiagramBuilderDemo.git

# Navigate to project directory
cd draw-diagram

# Install Dependencies
npm install

### Usage

# Start
npm run dev

#### NOTES

In diagram-display.jsx, there are a number of inline calculations. Here is a guide to help you understand them:

screenWidth: It represents the total width of the current screen. It won't change when the niche changes.

screenHeight: It represents the total height of the current screen. It won't change when the niche changes.

niche: Determines if the screen is "flat" or "niche". If "flat", the nicheDepth is 0, otherwise the user can set the nicheDepth between .5 and 2 inches.

totalNicheDepth: screenDepth + Math.max(mediaPlayerDepth, mountDepth) + (nicheDepthValue * 4).
This is the value of the screen's niche area without the screen's width/height taken into account. 
It is calculated on mount and when the screen, floor distance, niche, nicheDepth, mount, or mediaPlayer changes.

scalingFactor: The screens in the data folder have a range of widths and heights. This value takes the largest dimension of the current screen and the inversely scales that dimension to fit the container with a relatively consistent size differential between screen. screenWidth and screenHeight scaling calculation is done in a useEffect hook.

Calculation for total svg width: totalNicheDepth/2 * scalingFactor + screenWidth (already scaled) + SVG_ADJUST

Niche/2: Not calculating the full niche area, only two sides of the niche.

SVG_ADJUST: This is a constant that adjusts the size of the svg container.  This allows for labels outside of the screen + niche. The starting coordinates for the screen is not x=0 and y=0, but SVG_ADJUST/2.

FLOOR_LINE_X: This is a constant for the x coordinate of the line going from the floor to the screen center. Subtract this value from the total width of the svg to get the corresponding distance on the other side of the x axis.