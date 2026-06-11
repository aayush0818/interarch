// Central library of REAL project photography (the only imagery used site-wide).
// No AI-generated images may be imported anywhere else.

// Institutional
import institutionalAerial from "@/assets/institutional-aerial-campus.png";
import institutionalPool from "@/assets/institutional-pool-court.png";
import institutionalTower from "@/assets/institutional-green-tower.png";
import institutionalPalm from "@/assets/institutional-palm-court.png";

// Residential
import residentialGallery from "@/assets/residential-living-gallery.png";
import residentialWarm from "@/assets/residential-lounge-warm.png";
import residentialDining from "@/assets/residential-dining-light.png";
import residentialAquarium from "@/assets/residential-living-aquarium.png";
import residentialNoir from "@/assets/residential-lounge-noir.png";
import residentialLoungePastel from "@/assets/residential-lounge-pastel.png";
import residentialExteriorSunsetHouse from "@/assets/residential-exterior-sunset-house.png";
import residentialStairGallery from "@/assets/residential-stair-gallery.png";
import residentialDoubleheightLounge from "@/assets/residential-doubleheight-lounge.png";
import residentialAtriumLounge from "@/assets/residential-atrium-lounge.png";

// Brand / drawing assets
import manifestoSkyline from "@/assets/manifesto-skyline-drawing.png";
import homepageHeroResidentialEstate from "@/assets/home-hero-residential-estate.jpg";
import hospitalityPoolsideResort from "@/assets/hospitality-poolside-resort.png";

// Architectural sketches (menu hover art)
import sketchProjectsAsset from "@/assets/sketch-projects.png.asset.json";
import sketchExpertiseAsset from "@/assets/sketch-expertise.png.asset.json";
import sketchStudioAsset from "@/assets/sketch-studio.png.asset.json";
import sketchNewsAsset from "@/assets/sketch-news.png.asset.json";
import sketchContactAsset from "@/assets/sketch-contact.png.asset.json";

const sketchProjects = sketchProjectsAsset.url;
const sketchExpertise = sketchExpertiseAsset.url;
const sketchStudio = sketchStudioAsset.url;
const sketchNews = sketchNewsAsset.url;
const sketchContact = sketchContactAsset.url;

// Commercial
import commercialLounge from "@/assets/commercial-monster-lounge.png";
import commercialBoardroom from "@/assets/commercial-monster-boardroom.png";
import commercialCorridor from "@/assets/commercial-monster-corridor.png";
import commercialBoardroomSuite from "@/assets/commercial-boardroom-suite.png";
import commercialReception from "@/assets/commercial-reception-lobby.png";
import commercialBoutiquePanorama from "@/assets/commercial-boutique-panorama.png";
import commercialBoutiqueFloor from "@/assets/commercial-boutique-floor.png";
import commercialBoutiqueInterior from "@/assets/commercial-boutique-interior.png";
import commercialSalon from "@/assets/commercial-salon-interior.png";
import commercialTextile from "@/assets/commercial-textile-studio.png";
import commercialPilates from "@/assets/commercial-pilates-studio.png";

// Team portraits
import teamDipak from "@/assets/team-dipak-thaker.jpg";
import teamRohit from "@/assets/team-rohit-gojia.jpg";
import teamMurtaza from "@/assets/team-murtaza-rangwala.jpg";
import teamHussain from "@/assets/team-hussain-rangwala.jpg";

export const realImages = {
  brand: {
    manifestoSkyline,
    homepageHeroResidentialEstate,
    hospitalityPoolsideResort,
  },
  sketches: {
    projects: sketchProjects,
    expertise: sketchExpertise,
    studio: sketchStudio,
    news: sketchNews,
    contact: sketchContact,
  },
  institutional: {
    aerial: institutionalAerial,
    pool: institutionalPool,
    tower: institutionalTower,
    palm: institutionalPalm,
  },
  residential: {
    gallery: residentialGallery,
    warm: residentialWarm,
    dining: residentialDining,
    aquarium: residentialAquarium,
    noir: residentialNoir,
    pastel: residentialLoungePastel,
    exterior: residentialExteriorSunsetHouse,
    stair: residentialStairGallery,
    doubleheight: residentialDoubleheightLounge,
    atrium: residentialAtriumLounge,
  },
  commercial: {
    lounge: commercialLounge,
    boardroom: commercialBoardroom,
    corridor: commercialCorridor,
    boardroomSuite: commercialBoardroomSuite,
    reception: commercialReception,
    boutiquePanorama: commercialBoutiquePanorama,
    boutiqueFloor: commercialBoutiqueFloor,
    boutiqueInterior: commercialBoutiqueInterior,
    salon: commercialSalon,
    textile: commercialTextile,
    pilates: commercialPilates,
  },
  team: {
    dipak: teamDipak,
    rohit: teamRohit,
    murtaza: teamMurtaza,
    hussain: teamHussain,
  },
} as const;

const { institutional, residential, commercial } = realImages;

// A curated, mixed pool of real images for galleries / strips / journals.
export const realPool = [
  institutional.aerial,
  residential.exterior,
  commercial.lounge,
  institutional.pool,
  residential.stair,
  commercial.boutiquePanorama,
  institutional.tower,
  residential.doubleheight,
  commercial.reception,
  institutional.palm,
  residential.atrium,
  commercial.boardroomSuite,
  residential.pastel,
  residential.gallery,
  residential.warm,
  residential.dining,
  residential.aquarium,
  residential.noir,
  commercial.salon,
];

