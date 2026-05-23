/**
 * @name SpotifyListenAlong
 * @description Enables Spotify Listen Along feature on Discord without Premium
 * @version 1.2.1
 * @author ordinall - Reworked by b1ank3r
 * @authorId Hidden
 * @website https://github.com/b1ank3r/spotifyListenAlong
 */

module.exports = class SpotifyListenAlong {
    start() {
        const DeviceStore = BdApi.Webpack.getModule(m => m?.getActiveSocketAndDevice);
        if (!DeviceStore?.getActiveSocketAndDevice) return;

        BdApi.Patcher.after("SpotifyListenAlong", DeviceStore, "getActiveSocketAndDevice", (_, args, ret) => {
            if (ret?.socket) ret.socket.isPremium = true;
            return ret;
        });
    }

    stop() {
        BdApi.Patcher.unpatchAll("SpotifyListenAlong");
    }
};
