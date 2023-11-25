const images = [
    {
        title: "Saekano",
        censor: "https://telegraph-image-bak.pages.dev/file/900af1ded9657b3c3ec4d.png",
        uncensor: "https://telegraph-image-bak.pages.dev/file/e01e5a33de465a3a7edfc.png",
    },
    {
        title: "Machi váy đầm",
        censor: "https://telegraph-image-bak.pages.dev/file/0652b837a4fd9c4a06260.png",
        uncensor: "https://telegraph-image-bak.pages.dev/file/cb7f7491043006a22254c.png",
    },
    {
        title: "Machi bò",
        censor: "https://telegraph-image-bak.pages.dev/file/d84bc6d707aea3f76fc0a.png",
        uncensor: "https://telegraph-image-bak.pages.dev/file/67987f40d2fe73694310a.png",
    },
    {
        title: "Biya",
        censor: "https://telegraph-image-bak.pages.dev/file/3376074a7ef187fba1eb4.jpg",
        uncensor: "https://telegraph-image-bak.pages.dev/file/c4c81e2a167425d6f8623.jpg",
    },
    {
        title: "Nữ sinh cao trung cắn",
        censor: "https://img.kemono.su/thumbnail/data/7e/11/7e110eb9f59b3ddbf78059a05e91324931407d1f22d873e625abc2f795d12ac5.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/80/e3/80e3561a90f86a75f047332b2959d38e6990693a87f38a6717e5871c60812322.jpg",
    },
    {
        title: "Nữ sinh cao trung vụng về",
        censor: "https://img.kemono.su/thumbnail/data/16/51/1651330d542f590300f8e7a427d002a5d4a385a44f48ce8f1496f5421a6ac7f4.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/7c/ce/7cce74bb2b63e5c68da0cd2c086eefa4519ad2cd886322b3ed77cd85b94b3c89.jpg",
    },
    {
        title: "Nữ sinh cao trung thè lười",
        censor: "https://img.kemono.su/thumbnail/data/c3/ea/c3ea7798b5a31b3fb380dc3e06303952861a00f22980891107b5658ca2063b8b.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/76/15/7615b1ba19ee211eea634887aa2905aedd7476f8bc3b2bde9972aae38d536597.jpg",
    },
    {
        title: "Nữ sinh cao trung giơ nách",
        censor: "https://img.kemono.su/thumbnail/data/78/5a/785aa37f1deb9645830127fc6aefa5703e60bcbf38aab2e55e1cebd98db5c7f9.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/7a/fa/7afa5a68bf605ee76346b40c428a8c3e47e542f875d3d0084c65d819fa54c9ae.jpg",
    },
    {
        title: "3 nữ sinh cao trung",
        censor: "https://img.kemono.su/thumbnail/data/63/73/6373a39fb0f723945f2815582ebbc0bf17e6f93c4b8bda3191d769ea530fb621.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/d3/12/d3124204db4fcf2f403274b2a6988db64005aeb202a752fea4dbf7e622e9b9d7.jpg",
    },
    {
        title: "Nữ sinh cao trung nằm",
        censor: "https://img.kemono.su/thumbnail/data/25/51/2551f3772096770e3eebc83dbb0471e836211c06dc6acf69ea3c293bc04c95aa.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/f8/f1/f8f1296ac1678197a0e5d11b6d81d88858524c30831b0d33c94530c837f65f9a.jpg",
    },
    {
        title: "Nữ sinh cao trung cow girl",
        censor: "https://img.kemono.su/thumbnail/data/89/26/89260a4a40e858477dbdb1c2ab0d23b97dd7df42a0393dfc06d8946a2561e732.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/35/e3/35e3a17735a1151b63ec69d25ea3d58a8da7a7484bc90a1f5846e76a31dd5c1d.jpg",
    },
    {
        title: "Nữ sinh cao trung phi dao",
        censor: "https://img.kemono.su/thumbnail/data/00/48/004842c7091fd9a1ab06e92e883238d7baf748d0d6ddca9ee334e7d0385ec599.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/89/84/898438850c13cc9a2b8388dba6298708548abf9abb8e4b6b40e09284202b0f4b.jpg",
    },
    {
        title: "Nữ sinh cao trung chơi bóng",
        censor: "https://img.kemono.su/thumbnail/data/9c/5b/9c5b2af19074270a0ef67cfec2630777baf2477dd82929cd0cdb1d146afdec9d.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/d0/1a/d01a6ce5e60584a14e7640cd5fa8efb4619464f49e88d1bc8cd847eb3f1276a1.jpg",
    },
    {
        title: "Nữ sinh cao trung BDSM",
        censor: "https://img.kemono.su/thumbnail/data/44/02/44027fe3d66a5ca8396986940869f096ad8e8d9476f3691deb55edb0f69b1f00.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/f6/da/f6da214d906ebee9fcc3530b4581e4ea624f18d17528f1d441737f22fb1aca96.jpg",
    },
    {
        title: "Nữ sinh cao trung bunny",
        censor: "https://img.kemono.su/thumbnail/data/84/94/84942afee3da25ab386f99f09d787d9cdd95784404bdad1045ffa9a38ec3f3f5.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/06/7d/067df55c8b8b1ca7c9af6488be641ef280ca05bd494951c9b96df76ecc41b3d8.jpg",
    },
    {
        title: "Nữ sinh cao trung quên váy",
        censor: "https://img.kemono.su/thumbnail/data/fa/3c/fa3c4b3d3af18889b31cc76c65ad4755834f9ec6800c9c6030b8f82287bb5529.jpg",
        uncensor: "https://img.kemono.su/thumbnail/data/e6/ab/e6abfa73cf334e7e967fbc2a53ad51cc337344864b67a2329623d0147fe5666f.jpg",
    },
    // {
    //     title: "Nữ sinh cao trung",
    //     censor: "",
    //     uncensor: "",
    // },
]

export default images