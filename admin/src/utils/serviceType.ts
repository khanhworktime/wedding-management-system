

export function serviceType(type: "party_setup" | "audition" | "invitation" | "clothes" | "makeup" | "video_shot" | "controller" | "others"){
    switch (type) {
        case "party_setup":
            return "Tổ chức sự kiện"
        case "invitation":
            return "Thiệp mời"
        case "clothes":
            return "Trang phục"
        case "makeup":
            return "Trang điểm"
        case "video_shot":
            return "Ghi hình"
        case "controller":
            return "Điều phối MC"
        case "others":
            return "Khác"
        case "audition":
            return "Âm thanh"
    }
}