

const baseTransition = {
  duration: .5,
  ease: "linear"
}

export const exitUp ={
  initial: {},
  visible: {
    opacity: [0, 1],
    y: ["-8%", "0%"],
    transition: {
      duration: .5,
      times: [0, 1],
      ease: "linear"
    }
  },
  hidden: {
    opacity: 0,
    y: ["0%", "5%", "-20%"],
    transition: {
      duration: .7,
      times: [0, .25, .8],
      ease: "linear"
    }
  }
}

export const exitDown = {
  visible: {
    opacity: 1,
    transition: {
      duration: .7,
      ease: "linear"
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: .7,
      times: [0, .25, .8],
      ease: "linear"
    }
  },
}

export const modalShow = ( delay: number = 0) =>({
  visible: {
    opacity: 1,
    transition: {
      duration: .5,
      delay,
      ease: "linear"
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: .5,
      ease: "linear"
    }
  }
})

export const showRoomVariant = {
  visible : {
    opacity: 1,
    x: "0%",
    transition: baseTransition
  },
  hidden: {
    opacity: 0,
    x: "-10%",
    transition: baseTransition
  }
}