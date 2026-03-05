using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class GalleryManager : MonoBehaviour
{
    [Header("UI Elements")]
    public GameObject photoPrefab; // A square UI button
    public Transform galleryGrid;   // The grid layout group
    public TMPro.TMP_Dropdown calendarDropdown;

    // This simulates loading photos based on the selected date
    public void OnDateChanged()
    {
        string selectedDate = calendarDropdown.options[calendarDropdown.value].text;
        Debug.Log("Loading memories for: " + selectedDate);
        RefreshGallery(selectedDate);
    }

    void RefreshGallery(string date)
    {
        // 1. Clear existing squares
        foreach (Transform child in galleryGrid) {
            Destroy(child.gameObject);
        }

        // 2. Logic to pull images from the phone's gallery would go here
        // For now, let's spawn 12 empty squares as per your layout
        for (int i = 0; i < 12; i++) {
            Instantiate(photoPrefab, galleryGrid);
        }
    }
}
